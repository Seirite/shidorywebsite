import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {DialogData} from '../cart/cart.component';
import {Router} from '@angular/router';
import {VerificationErrorDialogProvider} from './verification-error-dialog.provider';

@Component({
    selector: 'app-verification-error-dialog',
    templateUrl: './verification-error-dialog.component.html',
    styleUrls: ['./verification-error-dialog.component.scss']
})
export class VerificationErrorDialogComponent implements OnInit {
    
    errorMessage: any;
    constructor(public provider: VerificationErrorDialogProvider, public dialog: MatDialog, public dialogRef: MatDialogRef<VerificationErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar, public router: Router,) {}

    ngOnInit() {
        this.errorMessage = this.data.error.message
    }
    

}
