import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TermsAndConditionProvider} from './terms-and-condition.provider';

@Component({
    selector: 'app-terms-and-condition',
    templateUrl: './terms-and-condition.component.html',
    styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
    countryList: any[] = [];
    numberOfTotalOrders: number = 0;
    numberOfVisitors: number = 0;
    numberOfCity: number = 0;
    numberOfRestaurant: number = 0;
    cityName: any;
    stateName: any;
    countryName: any;
    component: any;
    cartLength: string;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    constructor(public auth: AuthService, public router: Router, public dialog: MatDialog, public provider: TermsAndConditionProvider, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.cartLength = localStorage.getItem("cartLength");
        this.getLoginUserData();
        this.getUserPosition();
        this.getCountiesList();
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
    
    openLoginDialog(loginUIStatus)
    {
        let dialogBoxSettings = {
            height: '400px',
            width: '480px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
            data: {showLoginIterface: loginUIStatus}
        };
        this.component = LoginComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            this.router.navigate(['/home']);
        })
    }
    
    getUserPosition()
    {
        this.provider.getPosition().then(location =>
        {
            this.provider.getFormatedAddress(location.lat, location.lng).then((address: any) =>
            {
                address.results[0].address_components.forEach(async data =>
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
                    await this.getCountryReport();
                    await this.getNumberOfVisitors();
                    await this.getNumberOfOrder();
                })
            }).catch(error =>
            {
                var message = "Please check your internet setting";
                var action = "";
                this.openSnackBarAddress(message, action);
            })
        }).catch(error =>
        {
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
    
    getCountryReport()
    {
        if (this.countryName)
        {
            this.provider.getCountryReport(this.countryName).subscribe(list =>
            {
                this.numberOfRestaurant = list[0].RESTRO_COUNT;
                this.numberOfCity = list[0].CITY_COUNT;
            })
        }
    }
    
    getNumberOfOrder()
    {
        if (this.countryName)
        {
            this.provider.getNumberOfOrder(this.countryName).subscribe(list =>
            {
                list.forEach(data => 
                {
                    this.numberOfTotalOrders += data.ACCEPTED_ORDERS;
                })
            })
        }
    }
    
    getNumberOfVisitors()
    {
        this.provider.getNumberOfVisitors().subscribe(list =>
        {
            this.numberOfVisitors = list.length;
        })
    }
    
    getCountiesList()
    {
        this.provider.getCountiesList().subscribe((list: any[]) =>
        {
            this.countryList = list;
        })
    }
    
    onRightClick($event)
    {
//        return false;
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
