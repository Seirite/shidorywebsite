import { Component, OnInit, Inject } from '@angular/core';
import {VerificationDialogProvider} from './verification-dialog.provider';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {DialogData} from '../cart/cart.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-verification-dialog',
    templateUrl: './verification-dialog.component.html',
    styleUrls: ['./verification-dialog.component.scss']
})
export class VerificationDialogComponent implements OnInit {
    
    showError: boolean = false;
    loader: boolean = false;
    verificationCode: string;
    otpInput1 : number;
    otpInput2 : number;
    otpInput3 : number;
    otpInput4 : number;
    otpInput5 : number;
    otpInput6 : number;
    
    constructor(public provider: VerificationDialogProvider, public dialog: MatDialog, public dialogRef: MatDialogRef<VerificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar, public router: Router,) {}

    ngOnInit() { }
    
    moveFocus(nextElement) 
    {
        this.showError = false;
        nextElement.focus();
    }
    
    async verifyLoginCode() 
    {
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
                                await this.data.windowRef.confirmationResult
                                    .confirm(this.verificationCode)
                                    .then(async result => 
                                    {
                                        this.data.restaurantObj.key = result.user.uid;
                                        await this.saveRestro();
                                        this.dialogRef.close();
                                    })
                                    .catch(error => 
                                    {
                                        this.loader = false;
                                        this.dialogRef.close(error);
                                    });
                            }
                            else
                            {
                                this.showError = true
                            }
                        }
                        else
                        {
                            this.showError = true
                        }
                    }
                    else
                    {
                        this.showError = true
                    }
                }
                else
                {
                    this.showError = true
                }
            }
            else
            {
                this.showError = true
            }
        }
        else
        {
            this.showError = true
        }
    }
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    async saveRestro()
    {
        var saveCity = {
            key: this.data.restaurantObj.RESTRO_CITY_NAME.trim().toUpperCase()
        }
        var saveZone = {
            key: this.data.restaurantObj.RESTRO_LOCATION.geohash.substring(0, 5),
            geohash: this.data.restaurantObj.RESTRO_LOCATION.geohash.substring(0, 5)
        }
        await this.provider.saveCity(saveCity, this.data.restaurantObj.RESTRO_COUNTRY_NAME, this.data.restaurantObj.RESTRO_STATE_NAME);
        await this.provider.saveZone(saveZone, this.data.restaurantObj.RESTRO_COUNTRY_NAME, this.data.restaurantObj.RESTRO_STATE_NAME, this.data.restaurantObj.RESTRO_CITY_NAME);
        await this.provider.saveRestraunt(this.data.restaurantObj, this.data.restaurantObj.RESTRO_COUNTRY_NAME, this.data.restaurantObj.RESTRO_STATE_NAME, this.data.restaurantObj.RESTRO_CITY_NAME).then(uid => 
        {
            this.loader = false;
            this.router.navigate(['/thanku']);
        }).catch(error => 
        {
            this.loader = false;
            this.router.navigate(['/error']);
        })
    }

}
