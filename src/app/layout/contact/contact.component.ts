import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material';
import {ContactProvider} from './contact.provider';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    loader: boolean = false;
    component: any;
    cartLength: string;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    contactModel: {mobileNo?: number, fullName?: string, emailId?: string, reason?: string, message?: string, uid?: string} = {};
    constructor(public auth: AuthService, public router: Router, public dialog: MatDialog, public provider: ContactProvider, private http:  HttpClient) {}

    ngOnInit() {
        this.getLoginUserData();
        this.cartLength = localStorage.getItem("cartLength");
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
    
    submitEnquiry(Obj)
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
                    "name": Obj.fullName,
                    "message": Obj.message,
                    "subject": Obj.reason
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
