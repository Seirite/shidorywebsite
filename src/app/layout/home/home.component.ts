import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Observable, BehaviorSubject} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import {Router, NavigationExtras} from '@angular/router';
import {HomeProvider} from './home-provider';
import {MatDialog, MatTableDataSource, MatPaginator, MatSnackBar} from '@angular/material';
import {AuthService} from '../../utility/auth-service';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import * as geofirex from 'geofirex';
import * as firebase from 'firebase';
import {TrackOrderComponent} from '../track-order/track-order.component';
import {LoginComponent} from '../login/login.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    searchFail: boolean = false;
    restaurantListLength: number = 0;
    showTrackOrder: boolean;
    showList: boolean = true;
    showCountryList: boolean = true;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    countryList: any;
    cartLength: string;
    citiesWeServeList: any;
    cityName: any;
    stateName: any;
    countryName: any;
    currentAddress: any;
    loader: boolean = false;
    userLocation: {lat: number; lng: number;};
    @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    geo = geofirex.init(firebase);
    loginUserEmail: any;
    loginUserImage: any;
    loginUserName: any;
    loginDone: string;
    searchValue: any;
    menuArray: any[] = [];
    fileterListBy: any = "A";
    menuItemList: any[];
    dataSource: MatTableDataSource<{}>;
    component: any;
    failMeterCount: number = 0;
    hoProfile: {};
    lstZone: any;
    loading: boolean = false;
    showSpinner: boolean = true;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
//    options: {types: any[]; componentRestrictions: {country: string;};};
    country: any;
    options={
    types: [],
    componentRestrictions: { country: 'IN' }
    }
    radius = new BehaviorSubject(0.5);
    points: Observable<any>;
    safeSrc: SafeResourceUrl
    constructor(private provider: HomeProvider, private sanitizer: DomSanitizer, public router: Router, public auth: AuthService, public dialog: MatDialog, private snackBar: MatSnackBar) { 
       this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://youtu.be/95SNbn340TE");
    }

    ngOnInit() {
//        setTimeout(()=>{
//            this.showSpinner = false;
//        },1000)
        this.loading = true;
        this.cartLength = localStorage.getItem("cartLength");
        this.getUserPosition();
        this.getLoginUserData();
        if (this.cartLength == null)
        {
            var cartLength = 0;
            localStorage.setItem("cartLength", cartLength.toString());
            this.cartLength = localStorage.getItem("cartLength");
        }
    }
    
    public async handleAddressChange(address: Address, target: HTMLElement) 
    {
        address.address_components.forEach(data =>
        {
            if (data.types[0] === "country")
            {
                this.countryName = data.long_name.trim().toUpperCase();
            }
            if (data.types[0] === "administrative_area_level_1") 
            {
                this.stateName = data.long_name.trim().toUpperCase();
            }
            if (data.types[0] === "locality" || data.types[0] === "administrative_area_level_2")
            {
                this.cityName = data.long_name.trim().toUpperCase();
            }
        })
        this.userLocation = {
            lat : address.geometry.viewport.getCenter().lat(),
            lng : address.geometry.viewport.getCenter().lng()
        }
        target.scrollIntoView({behavior: 'smooth'});
        await this.getRestroUserTimezone(this.userLocation.lat, this.userLocation.lng);
        await this.getRestrauantListUserPositionWise();
    }
    
    async getRestrauantListUserPositionWise()
    {
        this.provider.serviceFirestore.getTimeUsingTimezone().then(async (date: String) =>
        {
            console.log(date);
            const center = this.geo.point(this.userLocation.lat, this.userLocation.lng);
            const radius = 5;
            const field = "RESTRO_LOCATION";
            this.points = this.radius.pipe(
                switchMap(r => 
                {
                    return this.geo.collection("SHIDORY/" + "ORG1/" + "COUNTRY/" + this.countryName + "/" + "STATES/" + this.stateName + "/" + "CITIES/" + this.cityName + "/" + "RESTAURANT_MST", ref => ref.where("RESTRO_ISLOGIN", "==", true).where("DEFAUNT", "==", false)).within(center, radius, field)
                })
            );
            await this.points.forEach(async list => 
            {
                list.forEach(restroData => 
                {
                    var currentHours = date.split(' ')[4].split(':')[0];
                    var currentMinites = date.split(' ')[4].split(':')[1];
                    var restroClosingTime = restroData.CLOSING_TIME
                    var restroOpeningTime = restroData.OPENING_TIME
                    var currentTime = currentHours + ":" + currentMinites;
                    var restroOpeningTimeDiffrence = this.getTimeDiffrence(restroOpeningTime, currentTime);
                    var restroClosingTimeDiffrence = this.getTimeDiffrence(currentTime, restroClosingTime);
                    if (restroOpeningTime < restroClosingTime)
                    {
                        if (restroOpeningTimeDiffrence >= 0 && restroClosingTimeDiffrence >= 0) 
                        {
                            restroData.restroStatus = "open";
                        }
                        else 
                        {
                            restroData.restroStatus = "closed";
                        }
                    }
                    else
                    {
                        if (restroOpeningTimeDiffrence < 0)
                        {
                            if (restroOpeningTimeDiffrence <= 0 && restroClosingTimeDiffrence >= 0) 
                            {
                                restroData.restroStatus = "open";
                            }
                            else 
                            {
                                restroData.restroStatus = "closed";
                            }
                        }
                        else
                        {
                            if (restroOpeningTimeDiffrence >= 0 && restroClosingTimeDiffrence <= 0) 
                            {
                                restroData.restroStatus = "open";
                            }
                            else 
                            {
                                restroData.restroStatus = "closed";
                            }
                        }
                    }
                })
                this.menuItemList = list;
                this.dataSource = new MatTableDataSource(this.menuItemList);
                this.restaurantListLength = this.menuItemList.length;
                if (this.menuItemList.length == 0) 
                {
                    this.showList = false;
                }
                else 
                {
                    this.showList = true;
                    this.dataSource.paginator = this.paginator;
                }
                this.loader = false;
                await this.provider.setUserFormatedAddress(this.userLocation.lat, this.userLocation.lng);
                await this.getCountiesList();
            })
        }).catch(error =>
        {
            console.log(error);
        })
    }
    
    getTimeDiffrence(startDateString: any, endDateString: any)
    {
        var start = startDateString.split(":");
        var end = endDateString.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        // If using time pickers with 24 hours format, add the below line get exact hours
//        if (hours < 0)
//            hours = hours + 24;

//        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
        return hours ;
    }
    
    async getRestroUserTimezone(latitude, longitude)
    {
        var timeZoneId: any = await this.provider.getTimezoneAccordingUser(latitude, longitude);
        localStorage.setItem("timeZoneId", timeZoneId);
    }
    
    getTimeInFormate(date)
    {
        var elem = date.split(' ');
        var stSplit = elem[0].split(":");
        var stHour = stSplit[0];
        var stMin = stSplit[1];
        var stAmPm = elem[1].toUpperCase();
        if (stAmPm == 'PM') 
        {
            if (stHour != 12) 
            {
                stHour = stHour * 1 + 12;
            }
        } 
        else if (stAmPm == 'AM' && stHour == '12') 
        {
            stHour = stHour - 12;
        } 
        else 
        {
            stHour = stHour;
        }
        return stHour + ':' + stMin;
    }
    
    getUserPosition()
    {
        this.loader = true;
        this.provider.getPosition().then(async location =>
        {
            var lat = localStorage.getItem("lat")
            var lng = localStorage.getItem("lng")
            if(lat == null && lng == null)
            {
                this.userLocation = {
                    lat: location.lat,
                    lng: location.lng
                }
                await this.provider.getFormatedAddress(location.lat, location.lng).then((address: any) =>
                {
                    address.results.forEach(async list => 
                    {
                        list.types.forEach(async data => 
                        {
                            if (data === "country") 
                            {
                                this.country = list.address_components[0].short_name;
                                this.countryName = list.address_components[0].long_name.trim().toUpperCase();
                                this.options = {
                                    types: [],
                                    componentRestrictions: {country: this.country}
                                }
                            }
                            if (data === "administrative_area_level_1") 
                            {
                                this.stateName = list.address_components[0].long_name.trim().toUpperCase();
                            }
                            if (data === "locality" || data === "administrative_area_level_2") 
                            {
                                this.cityName = list.address_components[0].long_name.trim().toUpperCase();
                            }
                            this.currentAddress = address.results[0].formatted_address;
                        })
                        var orderId = localStorage.getItem("selectOrderKey");
                        if (orderId) 
                        {
                            await this.getUserOrderUpdate();
                        }
                    })
                })
                await this.getRestroUserTimezone(this.userLocation.lat, this.userLocation.lng);
                await this.getRestrauantListUserPositionWise();
            }
            else
            {
                this.userLocation = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                }
                await this.provider.getFormatedAddress(lat, lng).then((address: any) =>
                {
                    address.results.forEach(async list => 
                    {
                        list.types.forEach(async data => 
                        {
                            if (data === "country") 
                            {
                                this.country = list.address_components[0].short_name;
                                this.countryName = list.address_components[0].long_name.trim().toUpperCase();
                                this.options = {
                                    types: [],
                                    componentRestrictions: {country: this.country}
                                }
                            }
                            if (data === "administrative_area_level_1") 
                            {
                                this.stateName = list.address_components[0].long_name.trim().toUpperCase();
                            }
                            if (data === "locality" || data === "administrative_area_level_2") 
                            {
                                this.cityName = list.address_components[0].long_name.trim().toUpperCase();
                            }
                            this.currentAddress = address.results[0].formatted_address;
                        })
                        var orderId = localStorage.getItem("selectOrderKey");
                        if (orderId) 
                        {
                            await this.getUserOrderUpdate();
                        }
                    })
                })
                await this.getRestroUserTimezone(this.userLocation.lat, this.userLocation.lng);
                await this.getRestrauantListUserPositionWise();
            }
        }).catch(error =>
        {
            this.loader = false;
            this.searchFail = true;
            var message = "Please allow the location.";
            var action = "";
            this.openSnackBarAddress(message, action);
        })
    }
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    logOut()
    {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
        localStorage.clear();
        this.cartLength = localStorage.getItem("cartLength");
        if (this.cartLength == null)
        {
            var cartLength = 0;
            localStorage.setItem("cartLength", cartLength.toString());
            this.cartLength = localStorage.getItem("cartLength");
        }
        this.showTrackOrder = false;
        this.getLoginUserData();
    }
    
    getLoginUserData()
    {
        this.loginDone = localStorage.getItem("isLoggedin");
        if (this.loginDone != null)
        {
            this.loginUserName = this.auth.getSession().displayName;
            this.loginUserImage = this.auth.getSession().photoURL;
            this.loginUserEmail = this.auth.getSession().email;
        }
        this.loading = false;
        this.getUserPosition();
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    
    getRestaurantList()
    {
        const center = this.geo.point(this.userLocation.lat, this.userLocation.lng);
        const radius = 5;
        const field = "RESTRO_LOCATION";
        this.points = this.radius.pipe(
            switchMap(r => 
            {
                return this.geo.collection("SHIDORY" + "ORG1" + "COUNTRY" + this.countryName + "STATES" + this.stateName + "CITIES" + this.cityName + "RESTAURANT_MST", ref => ref.where("RESTRO_ISLOGIN", "==", true)).within(center, radius, field)
            })
        );
        this.points.forEach(list =>
        {
            this.menuItemList = list;
            this.dataSource = new MatTableDataSource(this.menuItemList);
        })
    }
    
    getMenuItemsList()
    {
        this.getRestaurantList();
        this.provider.getMenuItemList().subscribe(list =>
        {
            this.dataSource = new MatTableDataSource(list);
        });
    }
    
    applyFilter(filterValue: string) 
    {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.fileterListBy == "A")
        {
            this.menuItemList = this.dataSource.filteredData;
            if (this.menuItemList.length == 0)
            {
                this.searchFail = true;
            }
            else
            {
                this.searchFail = false;
            }
        }
        if (this.fileterListBy == "R")
        {
            this.menuItemList = this.dataSource.filteredData;
        }
        if (this.fileterListBy == "M")
        {
            if (filterValue.length >= 3)
            {
                console.log(this.menuItemList);
                this.menuItemList = this.dataSource.filteredData;
                this.menuArray = [];
                this.menuItemList.forEach(data => 
                {
                    console.log(data);
                    var RESTAURENT_ID = data['RESTAURENT_ID'];
                    this.searchValue = data.MENU_ITEM_KEY;
//                    this.getMenuItemRestaurantWise(RESTAURENT_ID)
                })
            }
            else
            {
                this.getMenuItemsList();
            }
        }
    }
    
    getMenuItemRestaurantWise(RESTAURENT_ID)
    {
        this.provider.getMenuItemRestaurantWiseList(RESTAURENT_ID, this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            this.menuArray.push(list[0])
            this.menuItemList = this.menuArray;
        })
    }
    
    sortBy(filteValue)
    {
        this.fileterListBy = filteValue;
        switch (filteValue)
        {
            case "A": 
                this.getRestaurantList();
                break;
            case "R":
                this.getRestaurantList();
                break;
            case "M":
                this.getMenuItemsList();
                break;
        }
    }
    
    selectRestaurant(Obj)
    {
        localStorage.setItem("selectRestaurantKey", Obj.key)
        localStorage.setItem("search", this.searchValue)
        this.router.navigate(['/shop']);
    }
    
    getCitiesWeServe()
    {
        this.provider.getCitesWeServe(this.countryName, this.stateName).subscribe(list =>
        {
            this.citiesWeServeList = list;
        })
    }
    
    getCountiesList()
    {
        this.provider.getCountiesList().subscribe((list: any[]) =>
        {
            this.countryList = list;
            if (list.length == 0)
            {
                this.showCountryList = false;
            }
            else
            {
                this.showCountryList = true;
            }
        })
    }
    
    async getUserOrderUpdate()
    {
        if (typeof this.countryName != "undefined" && localStorage.getItem("restroKey") != null)
        {
            var restroData: any = await this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey"));
            this.provider.getUserOrder(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), localStorage.getItem("selectOrderKey")).subscribe((list: any[]) => 
            {
                if (list.length != 0)
                {
                    if (list[0].DELIVERD == false) 
                    {
                        this.showTrackOrder = true;
                    }
                    else 
                    {
                        this.showTrackOrder = false;
                    }
                }
                else 
                {
                    this.showTrackOrder = false;
                }
            })
        }
    }
    
    trackUserOrder()
    {
        let dialogBoxSettings = {
            width : '50%',
            height : '80%',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = TrackOrderComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
        })
    }
    
    openLoginDialog()
    {
        let dialogBoxSettings = {
            height: '400px',
            width: '480px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = LoginComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            this.getLoginUserData();
        })
    }
    
    onRightClick($event)
    {
        return false;
    }
    
    keyboardEvent($event)
    {
        if ($event.keyCode == 123) 
        {
            return false;
        }
        else if(($event.ctrlKey && $event.shiftKey && $event.keyCode == 73) || ($event.ctrlKey && $event.shiftKey && $event.keyCode == 74))
        {
            return false;
        }
    }

}
