import { Component, OnInit } from '@angular/core';
import {OtpDialogProvider} from './otp-dialog.provider';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import * as firebase from 'firebase';

@Component({
    selector: 'app-otp-dialog',
    templateUrl: './otp-dialog.component.html',
    styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent implements OnInit {
    
    verificationCode: string;
    loader: boolean = false;
    checkStatus: boolean = false;
    showError: boolean = false;
    windowRef: any;
    verifyStatus: boolean = false;
    userCallingCode: string;
    fullName: string;
    mobileNo: number;
    showVerification: boolean = false;
    otpInput1 : number;
    otpInput2 : number;
    otpInput3 : number;
    otpInput4 : number;
    otpInput5 : number;
    otpInput6 : number;
    constructor(public provider: OtpDialogProvider, public dialogRef: MatDialogRef<OtpDialogComponent>, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.userCallingCode = localStorage.getItem("callingCode");
    }
    
    moveFocus(nextElement) 
    {
        this.showError = false;
        nextElement.focus();
    }
    
    verifyPhoneNumber()
    {
        this.verifyStatus = true;
        this.windowRef = this.provider.windowRef;
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        this.windowRef.recaptchaVerifier.render();
        this.windowRef.recaptchaVerifier.verify().then(async data =>
        {
            if (data)
            {
                await this.sendLoginCode();
            }
        }).catch(error =>
        {
            this.verifyStatus=false;
            var message = error;
            var action = " ";
            this.showErrorAlert(message, action);
        })
    }
    
    sendLoginCode()
    {
        const num = this.userCallingCode + this.mobileNo;
        firebase.auth().signInWithPhoneNumber(num, this.windowRef.recaptchaVerifier)
            .then(result => 
            {
                this.windowRef.confirmationResult = result;
                this.showVerification = true;
            })
            .catch(error => 
            {
                this.verifyStatus=false;
                var message = error;
                var action = " ";
                this.showErrorAlert(message, action);
            });
    }
    
    showErrorAlert(message: string, action: string)
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    verifyLoginCode() 
    {
        this.checkStatus =  true;
        if (this.otpInput1)
        {
            if (this.otpInput2)
            {
                if (this.otpInput3)
                {
                    if (this.otpInput4)
                    {
                        if (this.otpInput5)
                        {
                            if (this.otpInput6)
                            {
                                this.loader = true;
                                this.verificationCode = this.otpInput1.toString() + this.otpInput2.toString() + this.otpInput3.toString() + this.otpInput4.toString() + this.otpInput5.toString() + this.otpInput6.toString()
                                this.windowRef.confirmationResult
                                    .confirm(this.verificationCode)
                                    .then(async result => 
                                    {
                                        console.log("vgvgvgc");
                                        console.log(result);
//                                        await this.provider.saveRestroUser(this.userLoginForm);
//                                        this.dialogRef.close();
                                    })
                                    .catch(error => 
                                    {
                                        this.checkStatus = false;
                                        this.showError = true
                                    });
                            }
                            else
                            {
                                this.showError = true
                                this.checkStatus = false;
                            }
                        }
                        else
                        {
                            this.showError = true
                             this.checkStatus = false;
                        }
                    }
                    else
                    {
                        this.showError = true
                         this.checkStatus = false;
                    }
                }
                else
                {
                    this.showError = true
                     this.checkStatus = false;
                }
            }
            else
            {
                this.showError = true
                 this.checkStatus = false;
            }
        }
        else
        {
            this.showError = true
             this.checkStatus = false;
        }
    }
}
