import { Component, OnInit } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ReservationProvider} from './reservation.provider';
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';
import {Router} from '@angular/router';
import {AuthService} from '../../utility/auth-service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import firebase = require('firebase');
import Geohash = require('latlon-geohash');
//npm i latlon-geohash
import {MatDialog, MatSnackBar} from '@angular/material';
import {VerificationDialogComponent} from '../verification-dialog/verification-dialog.component';
import {VerificationErrorDialogComponent} from '../verification-error-dialog/verification-error-dialog.component';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    zonePostalCode: any;
    zoneAreaName: any;
    addRestroStatus: boolean = false;
    numberOfTotalOrders: number = 0;
    numberOfVisitors: number = 0;
    numberOfCity: number = 0;
    numberOfRestaurant: number = 0;
    countryName: any;
    showRegisterButton: boolean = false;
    windowRef: any;
    component: any;
    correctEmail: boolean = false;
    cartLength: string;
    showMap: boolean = false;
    RESTRO_PHONE_NO: string;
    RESTRO_MOBILE_NO: string;
    entRestaurant : ADD_RESTAURANT_MST;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    hide = true;
    lat: number
    lng: number
    zoom: number = 17;
    addRestroForm: FormGroup;
    EMAIL_ID = new FormControl('', [Validators.email, Validators.required]);
    PASSWORD = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]);
    NAME = new FormControl('', [Validators.required]);
    RESTRO_OWNER_NAME = new FormControl('', [Validators.required]);
    MOBILE_NO = new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]);
    ADDRESS = new FormControl('', [Validators.required]);
    constructor(private util:SiUtil, public provider: ReservationProvider, public router: Router, public auth: AuthService, private fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
        this.entRestaurant = new ADD_RESTAURANT_MST();
        this.validateForm();
    }
    
    validName() {
        return this.addRestroForm.get('NAME').errors['required'] ? 'You must enter a restaurant name' :
            '';
    }
    
    validEmail() {
        return this.addRestroForm.get('EMAIL_ID').errors['required'] ? 'You must enter a restaurant email id' :
            this.addRestroForm.get('EMAIL_ID').errors['email'] ? 'Not a valid email' :
            '';
    }
    
    validOwnerName() {
        return this.addRestroForm.get('RESTRO_OWNER_NAME').errors['required'] ? 'You must enter a restaurant owner name' :
            '';
    }
    
    validMobile() {
        return this.addRestroForm.get('MOBILE_NO').errors['required'] ? 'You must enter a restaurant mobile number' :
            this.addRestroForm.get('MOBILE_NO').errors['maxLength'] ? 'Max carecter is 11' :
                this.addRestroForm.get('MOBILE_NO').errors['minLength'] ? 'Min carecter is 10' :
                    '';
    }
    
    validPassword() {
        return this.addRestroForm.get('PASSWORD').errors['required'] ? 'You must enter a value' :
            this.addRestroForm.get('PASSWORD').errors['maxLength'] ? 'Max carecter is 15' :
                this.addRestroForm.get('PASSWORD').errors['minLength'] ? 'Min carecter is 5' :
                    '';
    }
    
    validAddress() {
        return this.addRestroForm.get('ADDRESS').errors['required'] ? 'You must enter a restaurant address' :
                    '';
    }
    
    validateForm()
    {
        this.addRestroForm = this.fb.group({
            NAME : new FormControl('', [Validators.required]),
            EMAIL_ID : new FormControl('', [Validators.email, Validators.required]),
            PASSWORD : new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
            RESTRO_OWNER_NAME : new FormControl('', [Validators.required]),
            MOBILE_NO : new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]),
            ADDRESS : new FormControl('', [Validators.required])
        })
    }

    ngOnInit() { 
        this.cartLength = localStorage.getItem("cartLength");
        this.getLoginUserData();
        this.getUserPosition();
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
    }
    
    logOut()
    {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
        localStorage.clear();
        this.router.navigate(['/home']);
    }
    
    public async handleAddressChange(address: Address) 
    {
        address.address_components.forEach(data =>
        {
            if (data.types[0] == "country")
            {
                this.provider.getCountryObject(data.long_name.trim().toUpperCase()).subscribe(list =>
                {
                    if (list.length != 0)
                    {
                        this.entRestaurant.RESTRO_PHONE_CODE = list[0].OPR_PHONECODE;
                        this.showRegisterButton = true;
                    }
                    else
                    {
                        var message = "We cant start this in your country";
                        var action = "";
                        this.openSnackBarAddress(message, action);
                    }
                })
            }
            if (data.types[0] == "locality" || data.types[0] == "administrative_area_level_2")
            {
                this.showMap = true;
                this.entRestaurant.RESTRO_AREA_NAME = address.formatted_address;
                this.lat = address.geometry.viewport.getCenter().lat();
                this.lng = address.geometry.viewport.getCenter().lng();
            }
        })
        this.lat = address.geometry.viewport.getCenter().lat();
        this.lng = address.geometry.viewport.getCenter().lng();
        await this.clickMarker(this.lat, this.lng);
        await this.getRestroUserTimezone(this.lat, this.lng);
    }
    
    clickMarker(lat, lng)
    {
        this.lat = lat;
        this.lng = lng;
        this.provider.getFormatedAddress(lat, lng).then(async (address: any) =>
        {
            this.entRestaurant.RESTRO_ADDRESS = address.results[0].formatted_address;
            address.results[0].address_components.forEach(data =>
            {
                if(data.types[0] == "country")
                {
                    this.entRestaurant.RESTRO_COUNTRY_NAME = data.long_name.trim().toUpperCase();
                }
                if(data.types[0] == "administrative_area_level_1")
                {
                    this.entRestaurant.RESTRO_STATE_NAME = data.long_name.trim().toUpperCase();
                }
                if(data.types[0] == "locality" || data.types[0] == "administrative_area_level_2")
                {
                    this.entRestaurant.RESTRO_CITY_NAME = data.long_name.trim().toUpperCase();
                }
            })
            var geohash = Geohash.encode(address.results[0].geometry.location.lat, address.results[0].geometry.location.lng, 12);
            this.entRestaurant.RESTRO_LOCATION = {
                geohash: geohash,
                geopoint: new firebase.firestore.GeoPoint(address.results[0].geometry.location.lat, address.results[0].geometry.location.lng)
            }
            await this.getZoneAreaName();
        }).catch(error =>
        {
            console.log(error);
        })
    }
    
    getZoneAreaName()
    {
        var location = Geohash.decode(this.entRestaurant.RESTRO_LOCATION.geohash.substring(0, 5));
        this.provider.getFormatedAddress(location.lat, location.lon).then((address: any) =>
        {
            address.results.forEach((addressData: any) =>
            {
                addressData.types.forEach(areaTypeData =>
                {
                    if (areaTypeData == "neighborhood" || areaTypeData == "sublocality_level_1")
                    {
                        this.zoneAreaName = addressData.address_components[0].long_name;
                    }
                    if (areaTypeData == "postal_code")
                    {
                        this.zonePostalCode = addressData.address_components[0].long_name;
                    }
                })
            })
        }).catch(error =>
        {
            console.log(error);
            var message = "Check your Internet Connection";
            var action = "";
            this.openSnackBarAddress(message, action);
        })
    }
    
    async getRestroUserTimezone(latitude, longitude)
    {
        var timeZoneId: any = await this.provider.getTimezoneAccordingUser(latitude, longitude);
        this.entRestaurant.RESTRO_TIMEZONE_ID = timeZoneId;
        localStorage.setItem("timeZoneId", timeZoneId);
    }
    
    getUserPosition()
    {
        this.provider.getPosition().then(location =>
        {
            this.lat = location.lat;
            this.lng = location.lng;
            this.provider.getFormatedAddress(location.lat, location.lng).then((address: any) =>
            {
//                this.entRestaurant.RESTRO_ADDRESS = address.results[0].formatted_address
                address.results[0].address_components.forEach(async data =>
                {
                    if (data.types[0] === "country") 
                    {
                        this.entRestaurant.RESTRO_COUNTRY_NAME = data.long_name.trim().toUpperCase();
                        this.countryName = data.long_name.trim().toUpperCase();
                        await this.provider.getCountryObject(data.long_name.trim().toUpperCase()).subscribe(list =>
                        {
                            if (list.length != 0)
                            {
                                this.entRestaurant.RESTRO_PHONE_CODE =  list[0].OPR_PHONECODE;
                            }
                            else 
                            {
                                var message = "Check your Internet Connection";
                                var action = "";
                                this.openSnackBarAddress(message, action);
                            }
                        })
                        await this.getCountryReport();
                        await this.getNumberOfVisitors();
                        await this.getNumberOfOrder();
                    }
                })
            }).catch(error =>
            {
                console.log(error);
                var message = "Check your Internet Connection";
                var action = "";
                this.openSnackBarAddress(message, action);
            })
        }).catch(error =>
        {
            console.log(error);
        })
    }

    valiateForm()
    {
        if (typeof this.entRestaurant.RESTRO_NAME == "undefined")
        {
            this.util.toastError("Error", "Restro Name required.");
            return "ERROR";
        }
        if (typeof this.entRestaurant.RESTRO_OWNER_NAME == "undefined")
        {
            this.util.toastError("Error", "Restro Owner Name required.");
            return "ERROR";
        }
        if (typeof this.entRestaurant.RESTRO_EMAIL_ID == "undefined")
        {
            this.util.toastError("Error", "Email required.");
            return "ERROR";
        }
        if (typeof this.entRestaurant.RESTRO_PASSWORD == "undefined")
        {
            this.util.toastError("Error", "Password required.");
            return "ERROR";
        }
        if (typeof this.entRestaurant.RESTRO_ADDRESS == "undefined")
        {
            this.util.toastError("Error", "Address required.");
            return "ERROR";
        }
        if (typeof  this.RESTRO_MOBILE_NO == "undefined")
        {
            this.util.toastError("Error", "Mobile Number Required");
            return "ERROR";
        }
    }
    
    addRestraunt(Obj)
    {
        this.addRestroStatus = true;
        var status= this.valiateForm();
        if(status!="ERROR")
        {
            Obj.RESTRO_MOBILE_NO = this.entRestaurant.RESTRO_PHONE_CODE + this.RESTRO_MOBILE_NO
            this.auth.emailSignUp(this.entRestaurant.RESTRO_EMAIL_ID, this.entRestaurant.RESTRO_PASSWORD).then(async (data: any) => 
            {
                this.entRestaurant.key = data.uid;
                var saveCity = {
                    key: this.entRestaurant.RESTRO_CITY_NAME.trim().toUpperCase()
                }
                var saveZone = {
                    key: this.entRestaurant.RESTRO_LOCATION.geohash.substring(0, 5),
                    geohash: this.entRestaurant.RESTRO_LOCATION.geohash.substring(0, 5),
                    zoneAreaName: this.zoneAreaName,
                    zonePostalCode: this.zonePostalCode
                }
                await this.provider.saveCity(saveCity, this.entRestaurant.RESTRO_COUNTRY_NAME, this.entRestaurant.RESTRO_STATE_NAME);
                await this.provider.saveZone(saveZone, this.entRestaurant.RESTRO_COUNTRY_NAME, this.entRestaurant.RESTRO_STATE_NAME, this.entRestaurant.RESTRO_CITY_NAME);
                await this.provider.saveRestraunt(this.entRestaurant, this.entRestaurant.RESTRO_COUNTRY_NAME, this.entRestaurant.RESTRO_STATE_NAME, this.entRestaurant.RESTRO_CITY_NAME).then(uid => 
                {
                    this.addRestroStatus = false;
                    this.router.navigate(['/thanku']);
                }).catch(error => 
                {
                    this.addRestroStatus = false;
                    this.util.toastError("Error", "Account already existed");
                })
            }).catch(error => 
            {
                this.addRestroStatus = false;
                this.util.toastError("Error", "Account already existed");
            })
        }
        else
        {
            this.addRestroStatus = false;
        }
        
    }
    
    clear()
    {
        this.entRestaurant = new ADD_RESTAURANT_MST();
        this.RESTRO_MOBILE_NO = "";
        this.RESTRO_PHONE_NO = "";
    }
    
    getOTPDialog(Obj)
    {
        Obj.RESTRO_MOBILE_NO = this.entRestaurant.RESTRO_PHONE_CODE + this.RESTRO_MOBILE_NO;
        this.component = VerificationDialogComponent;
        const dialogRef = this.dialog.open(this.component,
        {
            width : '40%',
            data: {restaurantObj: Obj, windowRef: this.windowRef}
        });
        dialogRef.afterClosed().subscribe(async result =>
        {
            if (result)
            {
                this.getErrorAlert(result);
            }
        })
    }
    
    getErrorAlert(error)
    {
        this.component = VerificationErrorDialogComponent;
        const dialogRef = this.dialog.open(this.component,
        {
            width : '40%',
            data: {error: error}
        });
        dialogRef.afterClosed().subscribe(async result =>
        {
            console.log("dialog close");
        })
    }
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
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
            this.router.navigate(['/home']);
        })
    }
    
    checkRestroEmail($event)
    {
        this.auth.checkEmail($event.target.value).then(data =>
        {
            if (data.length != 0)
            {
                this.util.toastError("Error", "Already Exists");
            }
        })
    }
    
    getCountryReport()
    {
        this.provider.getCountryReport(this.countryName).subscribe(list =>
        {
            this.numberOfRestaurant = list[0].RESTRO_COUNT;
            this.numberOfCity = list[0].CITY_COUNT;
        })
    }
    
    getNumberOfOrder()
    {
        this.provider.getNumberOfOrder(this.countryName).subscribe(list =>
        {
            list.forEach(data =>
            {
                this.numberOfTotalOrders += data.ACCEPTED_ORDERS;
            })
        })
    }
    
    getNumberOfVisitors()
    {
        this.provider.getNumberOfVisitors().subscribe(list =>
        {
            this.numberOfVisitors = list.length;
        })
    }
    
}
