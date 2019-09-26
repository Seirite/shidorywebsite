import { Component, OnInit, Inject } from '@angular/core';
import {CustomisableDialogProvider} from './customisable-dialog.provider';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../cart/cart.component';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-customisable-dialog',
    templateUrl: './customisable-dialog.component.html',
    styleUrls: ['./customisable-dialog.component.scss']
})
export class CustomisableDialogComponent implements OnInit {
    menuItemTotalPrice: number;
    restroMenuItemObj: any;
    menuItemHalfPrice: number = 0;
    userCurrency: any;
    menuItemPrice: number = 0;
    menuItemCategory: any;
    menuItemName: any;
    cityName: string;
    stateName: string;
    countryName: string;
    constructor(public provider: CustomisableDialogProvider, public dialogRef: MatDialogRef<CustomisableDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

    async ngOnInit() {
        await this.getUserLocation();
        await this.getCountryObj();
        await this.getRestroMenuItemData();
    }
    
    getUserLocation()
    {
        return this.provider.getUserLocation().then((list: any) =>
        {
            list.results.forEach((data: Address) => 
            {
                if (data.types[0] === "country") 
                {
                    this.countryName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "administrative_area_level_1") 
                {
                    this.stateName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "locality" || data.types[0] === "administrative_area_level_2") 
                {
                    this.cityName = data.address_components[0].long_name.trim().toUpperCase();
                }
            })
        }).catch(error =>
        {
            console.log(error);
        })
    }
    
    async getCountryObj()
    {
        if (this.countryName)
        {
            var countryObj: any = await this.provider.getCountryObj(this.countryName);
            this.userCurrency = countryObj.OPR_CURRENCY_SYMBOL
        }
    }
    
    getRestroMenuItemData()
    {
        if (this.countryName)
        {
            this.provider.getRestroMenuItemData(this.data.menuKey, this.countryName, this.stateName, this.cityName, this.data.restaurantKey).then((restroMenuItemObj: any) =>
            {
                this.restroMenuItemObj = restroMenuItemObj;
                this.menuItemName = restroMenuItemObj.MENU_ITEM_NAME
                this.menuItemCategory = restroMenuItemObj.MENU_ITEM_CATEGORY
                this.menuItemPrice = restroMenuItemObj.MENU_ITEM_PRICE;
                this.menuItemTotalPrice = this.menuItemPrice;
                this.menuItemHalfPrice = restroMenuItemObj.MENU_ITEM_HALF_PRICE
            }).catch(error => 
            {
                console.log(error);
            })
        }
        else
        {
            console.log("country not found");
        }
    }
    
    selectMainCustomize(customizetype)
    {
        if (customizetype == "Half")
        {
            this.menuItemTotalPrice = this.menuItemHalfPrice;
            this.restroMenuItemObj.MENU_ITEM_PRICE = this.menuItemTotalPrice;
        }
        if (customizetype == "Full")
        {
            this.menuItemTotalPrice = this.menuItemPrice;
        }
    }
    
    addItem()
    {
        var arrayObj = {
            MENU_ITEM_CATEGORY: this.restroMenuItemObj.MENU_ITEM_CATEGORY.trim(),
            MENU_ITEM_CURRENCY: this.restroMenuItemObj.MENU_ITEM_CURRENCY,
            MENU_ITEM_INGRADIENTS: this.restroMenuItemObj.MENU_ITEM_INGRADIENTS,
            MENU_ITEM_NAME: this.restroMenuItemObj.MENU_ITEM_NAME,
            MENU_ITEM_HALF_PRICE: this.restroMenuItemObj.MENU_ITEM_HALF_PRICE,
            MENU_ITEM_PRICE: this.restroMenuItemObj.MENU_ITEM_PRICE,
            MENU_ITEM_QUANTITY: this.restroMenuItemObj.MENU_ITEM_QUANTITY,
            TODAY_SPECIAL: this.restroMenuItemObj.TODAY_SPECIAL,
            MENU_ITEM_TOTAL: this.restroMenuItemObj.MENU_ITEM_TOTAL,
            MENU_ITEM_IMAGE: this.restroMenuItemObj.MENU_ITEM_IMAGE,
            RESTAURENT_ID: this.restroMenuItemObj.RESTAURENT_ID,
            MENU_ITEM_KEY: this.restroMenuItemObj.MENU_ITEM_KEY,
            ORDER_STATUS: "PENDING",
        }
        this.dialogRef.close(arrayObj);
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
