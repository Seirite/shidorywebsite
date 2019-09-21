import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {DeliveryAddressProvider} from './delivery-address.provider';
import {AuthService} from '../../utility/auth-service';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {DialogData} from '../cart/cart.component';

@Component({
    selector: 'app-delivery-address',
    templateUrl: './delivery-address.component.html',
    styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
    deliveryAddressArray: any[] = [];
    deliveryBuldingNo?: string;
    deliveryStreetName?: string;
    deliveryAreaName?: string;
    deliveryNeighborhood?: string;
    deliveryZipcode?: string;
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DeliveryAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public provider:DeliveryAddressProvider,public auth: AuthService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.checkForDeliveryAddress();
    }
    
    addNewAddress()
    {
        if (this.deliveryAddressArray.length <= 3)
        {
            this.deliveryAddressArray.push({
                buldingNo: this.deliveryBuldingNo.trim(),
                zipcode: this.deliveryZipcode.trim(),
                address: this.deliveryStreetName.trim(),
                neighborhood: this.deliveryNeighborhood.trim(),
                areaName: this.deliveryAreaName.trim(),
                selectAddress: this.data.selectAddress,
                geohash: this.data.geohash
            })
            this.provider.getRestroUserData(this.auth.getSession().uid).then((entOrderMst: ADD_ORDER_MST) =>
            {
                entOrderMst.DEFAUNT = false;
                entOrderMst.RESTAURENT_ID = this.data.RESTAURENT_ID
                entOrderMst.DELIVERY_ADDRESS = this.deliveryAddressArray;
                this.provider.updateOrderToRestaurant(entOrderMst).then(success => 
                {
                    this.dialogRef.close();
                });
            })
        }
    }
    
    checkForDeliveryAddress()
    {
        this.provider.getRestroUserData(this.auth.getSession().uid).then((data: ADD_ORDER_MST) =>
        {
            if (data.DELIVERY_ADDRESS.length !== 0)
            {
                this.deliveryAddressArray = data.DELIVERY_ADDRESS;
            }
        }).catch(error =>
        {
            console.log("error");
        })
    }
    
    handleEnterEvent(nextElement)
    {
        nextElement.focus();
    }
}
