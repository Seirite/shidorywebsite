import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {MenuProvider} from './menu.provider';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {SiUtil} from '../../utility/SiUtil';


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
    constructor(public auth: AuthService, private util:SiUtil, public router: Router, public provider: MenuProvider, public dialog: MatDialog,  private snackBar: MatSnackBar, private http:  HttpClient) {}

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
    
    selectVehical($event)
    {
        this.haveVehicle = $event.checked
    }
    
    valiateForm()
    {
        if (typeof this.carrerModel.firstName == "undefined")
        {
            this.util.toastError("Error", "Name required.");
            return "ERROR";
        }
        if (typeof this.carrerModel.lastName == "undefined")
        {
            this.util.toastError("Error", "Name required.");
            return "ERROR";
        }
        if (typeof this.carrerModel.emailId == "undefined")
        {
            this.util.toastError("Error", "Email required.");
            return "ERROR";
        }
        if (typeof this.carrerModel.address == "undefined")
        {
            this.util.toastError("Error", "Address required feild.");
            return "ERROR";
        }
        if (typeof this.carrerModel.city == "undefined")
        {
            this.util.toastError("Error", "City required feild.");
            return "ERROR";
        }
        if (typeof this.carrerModel.state == "undefined")
        {
            this.util.toastError("Error", "State required feild.");
            return "ERROR";
        }
        if (typeof this.carrerModel.country == "undefined")
        {
            this.util.toastError("Error", "Country required feild.");
            return "ERROR";
        }
        if (typeof this.carrerModel.mobileNo == "undefined")
        {
            this.util.toastError("Error", "Mobile Number Required");
            return "ERROR";
        }
    }
    
    saveCarrerFormInfo(Obj)
    {
        var status = this.valiateForm();
        if (status != "ERROR")
        {
            this.loader = true;
            var message = "Contact No: " + this.carrerModel.mobileNo + "Address: " + this.carrerModel.address + ", " + this.carrerModel.city + ", " + this.carrerModel.state + ", " + this.carrerModel.country;
            let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/sendCarrerMessage`
            let httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            let body = {
                "Info":
                    {
                        "from": this.carrerModel.emailId,
                        "name": this.carrerModel.firstName + this.carrerModel.lastName,
                        "subject": "Apply For Job",
                        "message": message,
                    }
            };
            return this.http.post(url, body, httpOptions)
                .toPromise()
                .then(async res => {
                    this.loader = false;
                    this.util.toastSuccess("Success", "Your Application Submitted");
                    await this.sendThankYouMail();
                    this.router.navigate(['/home']);
                })
                .catch(err => {
                    this.loader = false;
                    this.router.navigate(['/error']);
                })
        }
    }
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
    
    sendThankYouMail()
    {
        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/thankuMessage`
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = {
            "Info":
                {
                    "name": this.carrerModel.firstName,
                }
        };
        return this.http.post(url, body, httpOptions)
    }
    
    mobileKeyPress(event: any) 
    {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) 
        {
            event.preventDefault();
        }
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
