import { Component, OnInit } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../utility/auth-service';
import {Subscription} from 'rxjs';
import {OrderConformProvider} from './order-conform.provider';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {TrackOrderComponent} from '../track-order/track-order.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {RestroRatingComponent} from '../restro-rating/restro-rating.component';

@Component({
    selector: 'app-order-conform',
    templateUrl: './order-conform.component.html',
    styleUrls: ['./order-conform.component.scss']
})
export class OrderConformComponent implements OnInit {
    showTrackOrder: boolean = false;
    userOTP: any;
    component: any;
    cartLength: string;
    cityName: any;
    stateName: any;
    countryName: any;
    loading: boolean = false;
    orderId: any;
    sub: Subscription;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    constructor(private util:SiUtil, private route: ActivatedRoute, public auth: AuthService, public router: Router, public provider: OrderConformProvider, public dialog: MatDialog, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.cartLength = localStorage.getItem("cartLength");
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        if (list == null || list.length == 0) 
        {
            var cartLength = 0;
            localStorage.setItem("cartLength", cartLength.toString());
            this.cartLength = localStorage.getItem("cartLength");
        }
        this.loading = true;
        this.getLoginUserData();
        this.sub = this.route.queryParams.subscribe(async params =>
        {
            var selectOrderKey = params["property_id"];
            localStorage.setItem("selectOrderKey", selectOrderKey)
            await this.getUserLocation();
            this.orderId = localStorage.getItem("selectOrderKey");
            await this.getUserOTP();
            this.loading = false;
        })
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
    
    async getUserOTP()
    {
        if (this.countryName)
        {
            var restroData: any = await this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey"));
            await this.provider.getUserOrderOTP(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), this.orderId).subscribe((list: any[]) => 
            {
                if (list.length != 0) 
                {
                    this.userOTP = list[0].RESTRO_USER_OTP;
                    if (list[0].DELIVERD == false) 
                    {
                        this.showTrackOrder = true;
                    }
                    else 
                    {
                        this.showTrackOrder = false;
                        this.ratingRestro();
                    }
                }
                else 
                {
                    this.showTrackOrder = false;
                }
            })
        }
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
    
    trackOrder()
    {
        let dialogBoxSettings = {
            width : '60%',
            height : '80%',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = TrackOrderComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
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
    
    ratingRestro()
    {
        let dialogBoxSettings = {
            height: '300px',
            width: '500px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = RestroRatingComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
//            this.router.navigate(['/home']);
        })
    }
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }

}
