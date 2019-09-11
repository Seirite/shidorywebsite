import { Component, OnInit } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import { Router} from '@angular/router';
import {AuthService} from '../../utility/auth-service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-thanku',
    templateUrl: './thanku.component.html',
    styleUrls: ['./thanku.component.scss']
})
export class ThankuComponent implements OnInit {
    component: any;
    cartLength: string;
    loginUserEmail: string;
    loginUserImage: string;
    loginUserName: string;
    loginDone: string;
    constructor(private util:SiUtil, public auth: AuthService, public router: Router, public dialog: MatDialog) {}

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
}
