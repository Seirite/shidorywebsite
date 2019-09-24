import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {MenuProvider} from './menu.provider';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {HttpHeaders, HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    haveVehicle: any;
    loader: boolean = false;
    userLocation: {lat: any; lng: any;};
    component: any;
    cartLength: string;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    lat: number;
    lng: number;
    zoom: number = 17;
    carrerModel: {mobileNo?: number, firstName?: string, middleName?: string, lastName?: string, emailId?: string, vehicalName?: string, vehicalNo?: number, licenceNo?: number, address?: string, education?: string, city?: string, state?: string, country?: string, pincode?: number, school?: string, college?: string, yfg?: string, uid?: string} = {};
    constructor(public auth: AuthService, public router: Router, public provider: MenuProvider, public dialog: MatDialog,  private snackBar: MatSnackBar, private http:  HttpClient) {}

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
    
    getUserPosition()
    {
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
                this.lat = this.userLocation.lat;
                this.lng = this.userLocation.lng;
            }
            else
            {
                this.userLocation = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                }
                this.lat = this.userLocation.lat;
                this.lng = this.userLocation.lng;
            }
        }).catch(error =>
        {
            var message = "Please allow the location.";
            var action = "";
            this.openSnackBar(message, action);
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
            this.router.navigate(['/home']);
        })
    }
    
    selectVehical($event)
    {
        this.haveVehicle = $event.checked
    }
    
    saveCarrerFormInfo(Obj)
    {
        this.loader = true;
        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/emailMessage`
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = {
            "Info":
                {
                    "from": Obj.emailId,
                    "name": Obj.firstName,
                }
        };
        return this.http.post(url, body, httpOptions)
            .toPromise()
            .then(res => {
                this.loader = false;
                this.router.navigate(['/home']);
            })
            .catch(err => {
                this.loader = false;
                this.router.navigate(['/error']);
            })
    }
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
}
