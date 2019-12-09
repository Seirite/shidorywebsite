import { Component, OnInit } from '@angular/core';
import {MobileNoDialogProvider} from './mobile-no-dialog.provider';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../utility/auth-service';
import {map, take} from 'rxjs/operators';
import {timer, Subscription} from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-mobile-no-dialog',
    templateUrl: './mobile-no-dialog.component.html',
    styleUrls: ['./mobile-no-dialog.component.scss']
})
export class MobileNoDialogComponent implements OnInit {
    mobileNumberOTP: number;
    counterList: Subscription;
    errorMessageOTP: string;
    counter: number;
    userName: string;
    otpButtonStatus: boolean = false;
    errorMessage: string;
    showOTPDialog: boolean = false;
    hideVerifyButton: boolean = false;
    callingCode: string;
    mobileNumber: number;
    otp: number;
    constructor(public provider: MobileNoDialogProvider, public auth: AuthService, public http:  HttpClient, public dialogRef: MatDialogRef<MobileNoDialogComponent>) {}

    ngOnInit() {
        this.callingCode = localStorage.getItem("callingCode");
        this.userName = this.auth.getSession().displayName;
    }
    
    verifyPhoneNumber()
    {
        if (this.mobileNumber)
        {
            if (this.mobileNumber.toString().length == 10)
            {
                this.checkWeatherMobileNoIsAlreadyLinkOrNot();
            }
            else
            {
                this.hideVerifyButton = false;
                this.showOTPDialog = false;
                this.errorMessage = "Enter Valid Mobile Number";
            }
        }
        else
        {
            this.errorMessage = "Enter Valid Mobile Number";
        }
    }
    
    async conformNumber()
    {
        if (this.otp)
        {
            if (this.otp == this.mobileNumberOTP)
            {
                if (this.auth.getSession())
                {
                    if (this.auth.getSession().uid)
                    {
                        var restroUserObj: any = await this.provider.getRestroUserObj(this.auth.getSession().uid);
                        restroUserObj.phoneNumber = this.callingCode + "" + this.mobileNumber.toString();
                        this.provider.updateRestroUser(restroUserObj).then(success =>
                        {
                            this.otpButtonStatus = true;
                            this.counterList.unsubscribe();
                            this.dialogRef.close("done");
                        }).catch(error =>
                        {
                            this.otpButtonStatus = false;
                        })
                    }
                }
            }
            else
            {
                this.otpButtonStatus = false;
                this.errorMessageOTP = "Enter Valid OTP";
            }
        }
        else
        {
            this.otpButtonStatus = false;
            this.errorMessageOTP = "Enter Valid OTP";
        }
    }
    
    startCounter()
    {
        var numberOfCount = 60;
        this.counterList = timer(0, 1000).pipe(map(() => --numberOfCount))
        .subscribe(counter =>
        {
            this.counter = counter;
            if (counter == 0)
            {
                this.counterList.unsubscribe();
            }
        })
    }
    
    resendOTP()
    {
        this.getOTPFromFunction();
        this.startCounter();
    }
    
    getOTPFromFunction()
    {
        this.mobileNumberOTP = Math.floor(Math.random() * 899999 + 100000);
        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/sendMessage`
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = {
            "Info":
                {
                    "to": this.callingCode + "" + this.mobileNumber,
                    "otp": this.mobileNumberOTP,
                    "name": this.userName
                }
        };
        return this.http.post(url, body, httpOptions).toPromise()
    }
    
    checkWeatherMobileNoIsAlreadyLinkOrNot()
    {
        var phoneNumber = this.callingCode + this.mobileNumber;
        this.provider.checkWeatherMobileNoIsAlreadyLinkOrNot(phoneNumber).then((mobileNoCheckStatus: any) =>
        {
            this.hideVerifyButton = true;
            this.getOTPFromFunction();
            setTimeout(() => 
            {
                this.showOTPDialog = true;
                this.startCounter();
            },1000)
        }).catch(error =>
        {
            this.hideVerifyButton = false;
            this.showOTPDialog = false;
            this.errorMessage = "Already exists with another user.";
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
