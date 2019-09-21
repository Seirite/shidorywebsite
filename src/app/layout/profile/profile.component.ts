import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {ProfileProvider} from './profile.provider';
import {MatDialog, MatSnackBar, MatBottomSheet} from '@angular/material';
import {ViewDetailComponent} from '../view-detail/view-detail.component';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ConformationDialogComponent} from '../conformation-dialog/conformation-dialog.component';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userOrderList: any[];
    userOrderLatestList: any[];
    loaddata: boolean = false;
    cityName: string;
    stateName: string;
    countryName: string;
    addRestroUserForm: FormGroup;
    loader: boolean = false;
    cartLength: string;
    userPostalCode: any;
    userCity: any;
    userState: any;
    userCountry: any;
    userAddress: any;
    userNumber: any;
    userDOB: any;
    component: any;
    loading: boolean = false;
    userEmail: any;
    userPhoto: any;
    userFName: any;
    userLName: any;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    constructor(public auth: AuthService, public router: Router, public provider: ProfileProvider, public dialog: MatDialog, private fb: FormBuilder, private snackBar: MatSnackBar, private bottomSheet: MatBottomSheet) {}

    async ngOnInit() {
        this.validateForm()
        this.cartLength = localStorage.getItem("cartLength");
        this.loading = true;
        await this.getUserLocation();
        await this.getLoginUserData();
        if (this.auth.getSession() != null)
        {
            await this.getRestroUserData(this.auth.getSession().uid);
            await this.getRestroUserOrder(this.auth.getSession().uid);
            await this.getRestroUserLatestOder(this.auth.getSession().uid);
        }
    }
    
    getUserLocation()
    {
        return this.provider.getUserLocation().then((list: any) =>
        {
            list.results.forEach((data: Address) => 
            {
                if (data.types[0] === "country") 
                {
                    this.countryName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "administrative_area_level_1") 
                {
                    this.stateName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "locality" || data.types[0] === "administrative_area_level_2") 
                {
                    this.cityName = data.address_components[0].long_name.trim().toUpperCase();
                }
            })
        }).catch(error =>
        {
            var message = "Please check your internet setting";
            var action = "";
            this.openSnackBar(message, action);
        })
    }
    
    
    validateForm()
    {
        this.addRestroUserForm = this.fb.group({
            userFName : new FormControl('', [Validators.required]),
            userLName : new FormControl('', [Validators.required]),
            userEmail : new FormControl('', [Validators.email, Validators.required]),
            userDOB : new FormControl('', [Validators.required]),
            userAddress : new FormControl('', [Validators.required]),
            userNumber : new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]),
            userPostalCode : new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(5)]),
            userCity : new FormControl('', [Validators.required]),
            userState : new FormControl('', [Validators.required]),
            userCountry : new FormControl('', [Validators.required])
        })
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
    
    getRestroUserData(key)
    {
        this.provider.getRestroUserData(key).then((restroUserData: any) =>
        {
            if (typeof restroUserData.userNumber == "undefined")
            {
                if (typeof restroUserData.mobileNo == "undefined")
                {
                    this.userNumber = restroUserData.phoneNumber;
                }
                else
                {
                    this.userNumber = restroUserData.mobileNo;
                }
            }
            else
            {
                this.userNumber = restroUserData.userNumber;
            }
            this.userDOB = restroUserData.userDOB;
            this.provider.getPosition().then(location =>
            {
                this.provider.getFormatedAddress(location.lat, location.lng).then((address: any) =>
                {
                    this.userFName = restroUserData.userFName;
                    this.userLName = restroUserData.userLName;
                    if (typeof this.userLName == "undefined" && typeof this.userFName == "undefined")
                    {
                        this.userFName = restroUserData.displayName;
                        if (typeof this.userFName == "undefined")
                        {
                            this.userFName = restroUserData.fullName;
                        }
                    }
                    if (typeof restroUserData.photoURL == "undefined")
                    {
                        this.userPhoto = "assets/profile.png";
                    }
                    else
                    {
                        this.userPhoto = restroUserData.photoURL;
                    }
                    this.userEmail = restroUserData.email;
                    if (typeof this.userEmail == "undefined")
                    {
                        this.userEmail = restroUserData.emailId;
                    }
                    this.loading = false;
                }).catch(error =>
                {
                    var message = "Please check your internet setting";
                    var action = "";
                    this.openSnackBar(message, action);
                })
            }).catch(error =>
            {
                var message = "Please check your internet setting";
                var action = "";
                this.openSnackBar(message, action);
            })
        }).catch(error =>
        {
            var message = "Please check your internet setting";
            var action = "";
            this.openSnackBar(message, action);
        })
    }
    
    getRestroUserOrder(key)
    {
        if (typeof this.countryName != "undefined" && typeof this.stateName != "undefined" && typeof this.cityName != "undefined")
        {
            this.provider.getRestroUserOrder(key, this.countryName, this.stateName, this.cityName).then((userOrderList: any[]) =>
            {
                this.userOrderList = userOrderList;
            })
        }
        else
        {
            console.log("Country Not Found");
        }
    }
    
    getRestroUserLatestOder(key)
    {
        if (typeof this.countryName != "undefined" && typeof this.stateName != "undefined" && typeof this.cityName != "undefined")
        {
            this.provider.getRestroUserLatestOrder(key, this.countryName, this.stateName, this.cityName).then((userOrderLatestList: any[]) =>
            {
                this.userOrderLatestList = userOrderLatestList;
            })
        }
        else
        {
            console.log("Country Not Found");
        }
    }
    
    viewDetail(Obj)
    {
        let dialogBoxSettings = {
            width : '50%',
            height : '80%',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
            data: {ORDER_ID: Obj.key, RESTAURENT_ID: Obj.RESTAURENT_ID}
        };
        this.component = ViewDetailComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            console.log("dialog closed");
        })
    }
    
    updateRestroUserProfile()
    {
        this.loader = true;
        this.provider.getRestroUserData(this.auth.getSession().uid).then((restroUserObject: any) =>
        {
            restroUserObject.userNumber = this.userNumber;
            restroUserObject.userDOB = this.userDOB;
            restroUserObject.userFName = this.userFName;
            restroUserObject.userLName = this.userLName;
            this.provider.updateOrderToRestaurant(restroUserObject);
            setTimeout(() =>
            {
                this.loader = false;
            }, 2000)
        })
    }
    
    cancleOrder(Obj: ADD_ORDER_MST)
    {
        if (Obj.ORDER_STATUS == "PENDING")
        {
            this.showConformationAlert(Obj);
        }
        else
        {
            var message = "Sorry, You cant cancel the order now.";
            var action = " ";
            this.openSnackBar(message, action);
        }
    }
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    showConformationAlert(Obj: ADD_ORDER_MST)
    {
        const bottomSheetRef = this.bottomSheet.open(ConformationDialogComponent, {data: {Obj: Obj}});
        bottomSheetRef.afterDismissed().subscribe(async (data) => 
        {
            if (data == "Y")
            {
                this.loaddata = true;
                var restroData: any = await this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, Obj.RESTAURENT_ID);
                await this.provider.deleteRestroUserOrderFromZone(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), Obj.key);
                await this.provider.deleteRestroUserOrderFromUserSide(this.auth.getSession().uid, Obj.key);
                var message = "Congratulations, You order cancel successfully.";
                var action = " ";
                await this.openSnackBar(message, action);
                this.loaddata = false;
                await this.router.navigate(['/home']);
            }
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
    
    
}
