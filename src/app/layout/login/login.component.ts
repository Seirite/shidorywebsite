import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../utility/auth-service';
import {LoginProvider} from './login.provider';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar, MatDialogRef, MatStepper} from '@angular/material';
import {SiUtil} from '../../utility/SiUtil';
import * as firebase from 'firebase';
//import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
//import * as toPromise 'rxjs/add/operator/toPromise';
export class RegisterForm{
    fullName:string;
    emailId:string;
    uid:any;
    photoURL:any;
    key:any;
    provider:any;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    
})
export class LoginComponent implements OnInit {
    ResendOtpSendStatus: boolean = false;
    loginOtp: number;
    validError: string;
    error: boolean=false;
    message: string;
    RegisterOtp: number;
    verifyOtpStatus:boolean=false;
    signUpStatus:boolean = false;
    verifySignUpOtpStatus:boolean=false;
    userEmail:string;
    loginStatus: boolean = false;
    checkStatus: boolean=false;
    windowRef: any;
    Registerform: RegisterForm;
    countryList: any;
    verifyStatus: boolean = false;
    visibleVerifyForm: boolean = false;
    loadingRegistration: boolean = false;
    loadingLogin: boolean = false;
    registerForm: boolean = false;
    callingCode: string;
    registrationModel: {mobileNo?: number, fullName?: string, emailId?: string, password?: string, provider?: string, photoURL?: string, uid?: string} = {};
    loginModel: {emailId?: string, password?: string} = {};
    registrationForm: FormGroup;
    loginForm: FormGroup;
    hide = true;
   isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showError: boolean = false;
    loader: boolean = false;
    verificationCode: any;
    otp:number;
    loginotpuser:number;
    validOtpStatus:boolean = false;
    hideRegisterButton:boolean=false;
    otpStatusButton : boolean = false;
    constructor(public router: Router, private util:SiUtil,private formBuilder: FormBuilder, private http:  HttpClient,
                public auth: AuthService, public provider: LoginProvider, private fb: FormBuilder, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<LoginComponent>) {
        this.validateRegistrationForm();
        this.validateLoginForm();
        this.Registerform = new RegisterForm();
    }

    ngOnInit() {
//        this.windowRef = window;
        
    this.firstFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      
    });
        
        this.callingCode = localStorage.getItem("callingCode");
        this.provider.getCountryList().subscribe(list=>{
            this.countryList = list;
        })
    }
    
    
    
    validName() {
        return this.registrationForm.get('REGISTERATION_NAME').errors['required'] ? 'You must enter a name' :
            '';
    }
    
    validEmail() {
        return this.registrationForm.get('REGISTERATION_EMAIL_ID').errors['required'] ? 'You must enter a email id' :
            this.registrationForm.get('REGISTERATION_EMAIL_ID').errors['email'] ? 'Not a valid email' :
            '';
    }
    
    validPassword() {
        return this.registrationForm.get('REGISTERATION_PASSWORD').errors['required'] ? 'You must enter a value' :
            this.registrationForm.get('REGISTERATION_PASSWORD').errors['maxLength'] ? 'Max carecter is 15' :
                this.registrationForm.get('REGISTERATION_PASSWORD').errors['minLength'] ? 'Min carecter is 5' :
                    '';
    }
    
    validLoginEmail() {
        return this.loginForm.get('LOGIN_EMAIL_ID').errors['required'] ? 'You must enter a email id' :
            this.loginForm.get('LOGIN_EMAIL_ID').errors['email'] ? 'Not a valid email' :
            '';
    }
    
    validLoginPassword() {
        return this.loginForm.get('LOGIN_PASSWORD').errors['required'] ? 'You must enter a value' :
            this.loginForm.get('LOGIN_PASSWORD').errors['maxLength'] ? 'Max carecter is 15' :
                this.loginForm.get('LOGIN_PASSWORD').errors['minLength'] ? 'Min carecter is 5' :
                    '';
    }
    
    validMobile() {
        return this.registrationForm.get('REGISTERATION_MOBILE_NO').errors['required'] ? 'You must enter a mobile number' :
            this.registrationForm.get('REGISTERATION_MOBILE_NO').errors['maxLength'] ? 'Max carecter is 11' :
                this.registrationForm.get('REGISTERATION_MOBILE_NO').errors['minLength'] ? 'Min carecter is 10' :
                    '';
    }
    
    validateRegistrationForm()
    {
        this.registrationForm = this.fb.group({
            REGISTERATION_EMAIL_ID : new FormControl('', [Validators.email, Validators.required]),
//            REGISTERATION_PASSWORD : new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
            REGISTERATION_NAME : new FormControl('', [Validators.required]),
            REGISTERATION_MOBILE_NO : new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]),
        })
    }
    
    validateLoginForm()
    {
        this.loginForm = this.fb.group({
            LOGIN_EMAIL_ID : new FormControl('', [Validators.email, Validators.required]),
            LOGIN_PASSWORD : new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
        })
    }
    
    moveFocus(nextElement) 
    {
        this.showError = false;
        nextElement.focus();
    }
    
    openRegistration()
    {
        this.registerForm = true
    }
    
    checkEmailId(email)
    {
        this.auth.checkEmail(email).then(data =>
        {
            if (data.length != 0)
            {
                this.util.toastError("Error", "The email address is already in use by another account");
            }
        }).catch(error =>
        {
        })
    }
    
    showErrorAlert(message: string, action: string)
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    openLogin()
    {
        this.registerForm = false
    }
    
    Login() 
    {
        this.loginStatus = true;
    }

    loginUser() 
    {
        this.hideRegisterButton = true;
        this.auth.checkEmail(this.userEmail).then((data) => 
        {
            if (data.length != 0) 
            {
                if (data[0] == "password") 
                {
                    this.loginOtp = Math.floor(Math.random() * 899999 + 100000);
                    let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/emailMessage`
                    let httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                        })
                    };
                    let body = {
                        "Info":
                            {
                                "to": this.userEmail,
                                "otp": this.loginOtp,
                                "name": ""
                            }
                    };
                    return this.http.post(url, body, httpOptions)
                        .toPromise()
                        .then(res => 
                        {
                            this.verifyOtpStatus = true;
                        })
                        .catch(err => 
                        {
                            this.hideRegisterButton = false;
                        })
                }

                else if (data[0] == "google.com") 
                {
                    this.hideRegisterButton = false;
                    this.error = true;
                    this.message = "You'r already login with google"
                }

                else if (data[0] == 'facebook.com') 
                {
                    this.hideRegisterButton = false;
                    this.error = true;
                    this.message = "Your already login with facebook"
                }

            }
            else 
            {
                this.hideRegisterButton = false;
                this.error = true;
                this.message = "User not found please register"
            }
        }).catch(error =>
        {
            this.hideRegisterButton = false;
            this.error = true;
            this.message = error.message
        })
    }
    
    loginAfterCheckEmail()
    {
        var emailType = this.userEmail.includes("gmail.com");
        if (!emailType)
        {
            this.error = true;
            this.message = "Email Id must contain gmail.com"
        }
        else
        {
            this.loginUser();
        }
    }

    verifyLoginUser() 
    {
        this.otpStatusButton = true;
        if (this.loginotpuser == this.loginOtp) 
        {
            this.auth.emailLogin(this.userEmail, "123456").then(async user => 
            {
                const data = {
                    uid: user.uid,
                    email: this.userEmail || null,
                    displayName: this.userEmail || 'nameless user',
                    photoURL: 'assets/profile.png' || 'https://goo.gl/Fz9nrQ',
                    ORG_ID: "1",
                    OPR_ID: "1"
                };
                await this.auth.setSession(data);
                localStorage.setItem('isLoggedin', 'true');
                this.dialogRef.close();

            }).catch(error => 
            {
                this.otpStatusButton = false;
            })
        }
        else 
        {
            this.validOtpStatus = true;
            this.otpStatusButton = false;
            this.validError = "Invalid otp";
        }
    }

    UserSignUp() {
        this.signUpStatus = true;
    }

    registerUser() 
    {
        this.hideRegisterButton = true;
        this.auth.checkEmail(this.Registerform.emailId).then((data) => 
        {
            if (data.length == 0) 
            {
                this.RegisterOtp = Math.floor(Math.random() * 899999 + 100000);
                let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/emailMessage`
                let httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                };
                let body = {
                    "Info":
                        {

                            "to": this.Registerform.emailId,
                            "otp": this.RegisterOtp,
                            "name": this.Registerform.fullName
                        }
                };
                return this.http.post(url, body, httpOptions)
                    .toPromise()
                    .then(res => 
                    {
                        this.verifySignUpOtpStatus = true;
                    })
                    .catch(err => 
                    {
                        this.hideRegisterButton = false;
                    })
            }
            else 
            {
                this.hideRegisterButton = false;
                this.error = true;
                this.message = "Email is already exist"
            }
        }).catch(error => 
        {
            this.hideRegisterButton = false;
            this.error = true;
            this.message = error.message
        })

    }
    
    registerAfterCheckEmail()
    {
        var emailType = this.Registerform.emailId.includes("gmail.com");
        if (!emailType)
        {
            this.error = true;
            this.message = "Email Id must contain gmail.com"
        }
        else
        {
            this.registerUser();
        }
    }
    
    handleEnterEvent(nextElement)
    {
        nextElement.focus();
    }

    verifyRegisterUser() 
    {
        this.otpStatusButton = true;
        if (this.RegisterOtp == this.otp) 
        {
            this.auth.emailSignUp(this.Registerform.emailId, "123456").then(async user => 
            {
                this.Registerform.uid = user.uid;
                this.Registerform.key = user.uid;
                this.Registerform.photoURL = 'assets/profile.png' || 'https://goo.gl/Fz9nrQ';
                const data = {
                    uid: user.uid,
                    email: this.Registerform.emailId || null,
                    displayName: this.Registerform.emailId || 'nameless user',
                    photoURL: 'assets/profile.png' || 'https://goo.gl/Fz9nrQ',
                    ORG_ID: "1",
                    OPR_ID: "1"
                };
                await this.auth.setSession(data);
                await this.provider.saveRestroUser(this.Registerform);
                localStorage.setItem('isLoggedin', 'true');
                this.dialogRef.close();
            }).catch(error => 
            {
                this.otpStatusButton = false;
            })
        }
        else 
        {
            this.otpStatusButton = false;
            this.validOtpStatus = true;
            this.validError = "Invalid otp";
        }
    }


    ResendLoginOtp() {
        this.ResendOtpSendStatus = true;
        this.loginOtp = Math.floor(Math.random() * 899999 + 100000);
        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/emailMessage`
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = {
            "Info":
                {
                    "to": this.userEmail,
                    "otp": this.loginOtp,
                    "name": ""
                }
        };
        return this.http.post(url, body, httpOptions)
            .toPromise()
            .then(res => {
                this.verifyOtpStatus = true;
            })
            .catch(err => {
                this.hideRegisterButton = false;
            })
    }

    ResendRegisterOtp() {
        this.ResendOtpSendStatus = true;
        this.RegisterOtp = Math.floor(Math.random() * 899999 + 100000);
        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/emailMessage`
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        let body = {
            "Info":
                {
                    "to": this.Registerform.emailId,
                    "otp": this.RegisterOtp,
                    "name": this.Registerform.fullName
                }
        };
        return this.http.post(url, body, httpOptions)
            .toPromise()
            .then(res => {
                this.verifySignUpOtpStatus = true;
            })
            .catch(err => {
                this.hideRegisterButton = false;
            })
    }
    
    async callFacebook()
    {
        await this.facebookLogin();
        this.dialogRef.close();
    }
    
    async facebookLogin()
    {
        await this.auth.facebookLogin().then((status: any) =>
        {
            if (typeof status == "undefined")
            {
                var message = "The email address is already in use by another account.";
                var action = " ";
                this.showErrorAlert(message, action);
            }
            if (status)
            {
                localStorage.setItem('isLoggedin', 'true');
                this.provider.getRestroUserData(status.uid).then((restroUserData: any) => 
                {
                    if (typeof restroUserData === "undefined" || restroUserData === null) 
                    {
                        status.provider = "facebook.com";
                        this.provider.saveRestraunt(status).then(success => 
                        {
                            this.dialogRef.close();
                        })
                    }
                    else 
                    {
                        this.dialogRef.close();
                    }
                })
            }
        }).catch(error =>
        {
            console.log(error)
        })
    }
    
    async callGoogle()
    {
        await this.googleLogin();
        this.dialogRef.close();
    }
    
    async googleLogin()
    {
        await this.auth.googleLogin().then((status: any) =>
        {
            localStorage.setItem('isLoggedin', 'true');
            this.provider.getRestroUserData(status.uid).then((restroUserData: any) =>
            {
                if (typeof restroUserData === "undefined" || restroUserData === null)
                {
                    status.provider = "google.com";
                    this.provider.saveRestraunt(status).then(success =>
                    {
                        this.dialogRef.close();
                    })
                }
                else
                {
                    this.dialogRef.close();
                }
            })
            
        }).catch(error =>
        {
            console.log(error);
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
