import { Component, OnInit } from '@angular/core';
import {AlertDialogProvider} from './alert-dialog.provider';
import {MatBottomSheetRef} from '@angular/material';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
    constructor(public provider: AlertDialogProvider, private bottomSheetRef: MatBottomSheetRef<AlertDialogComponent>) {}

    ngOnInit() {}
    
    proccedToCart()
    {
        localStorage.removeItem("menuItemArray");
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        if (list == null) 
        {
            var cartLength = 0;
            localStorage.setItem("cartLength", cartLength.toString());
            this.bottomSheetRef.dismiss("Y");
        }
    }
    
    stayWithCart()
    {
        this.bottomSheetRef.dismiss("N");
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
