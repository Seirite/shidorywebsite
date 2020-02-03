import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {ConformationDialogProvider} from './conformation-dialog.provider';

@Component({
    selector: 'app-conformation-dialog',
    templateUrl: './conformation-dialog.component.html',
    styleUrls: ['./conformation-dialog.component.scss']
})
export class ConformationDialogComponent implements OnInit {
    constructor(public provider: ConformationDialogProvider, private bottomSheetRef: MatBottomSheetRef<ConformationDialogComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

    ngOnInit() {}
    
    stayWithCart()
    {
        this.bottomSheetRef.dismiss("N");
    }
    
    deleteOrder()
    {
        this.bottomSheetRef.dismiss("Y");
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
