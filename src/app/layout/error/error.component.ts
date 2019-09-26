import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth-service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    component: any;
    cartLength: string;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    constructor(public auth: AuthService, public router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.cartLength = localStorage.getItem("cartLength");
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
