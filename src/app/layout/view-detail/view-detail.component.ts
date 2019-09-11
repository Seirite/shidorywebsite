import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../cart/cart.component';
import {ViewDetailProvider} from './view-detail.provider';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';

@Component({
    selector: 'app-view-detail',
    templateUrl: './view-detail.component.html',
    styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
    couponName: string;
    discountAmount: string;
    totalPrice: string;
    selectAddress: any;
    orderId: any;
    destination: {lat: number; lng: number;};
    deliveryStatusList: any[];
    userOTP: any;
    origin: {lat: any; lng: any;};
    cityName: string;
    stateName: string;
    countryName: string;
    constructor(public dialogRef: MatDialogRef<ViewDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public provider: ViewDetailProvider) {}

    async ngOnInit() {
        await this.getUserLocation();
        await this.trackOrder();
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
    
    async trackOrder()
    {
        var restroData: any = await this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, this.data.RESTAURENT_ID);
        this.origin = {
            lat: restroData.RESTRO_LOCATION.geopoint.latitude,
            lng: restroData.RESTRO_LOCATION.geopoint.longitude
        }
        this.provider.getUserOrderList(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), this.data.ORDER_ID).subscribe(async (list: ADD_ORDER_MST[]) =>
        {
            if (list.length != 0)
            {
                this.orderId = list[0].ORDER_ID;
                this.selectAddress = list[0].SELECT_ADDRESS;
                this.totalPrice = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_TOTAL;
                this.discountAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_DISCOUNT_TOTAL;
                this.couponName = list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME;
                this.userOTP = list[0].RESTRO_USER_OTP;
                this.deliveryStatusList = list[0].ORDER_STATUS_ARRAY.reverse();
                this.destination = {
                    lat: list[0].SELECT_ADDRESS_GEOPOINT_LATITUDE,
                    lng: list[0].SELECT_ADDRESS_GEOPOINT_LONGITUDE
                }
            }
            else
            {
                console.log("Order Delete");
            }
//            this.deliveryStatusList.forEach(data =>
//            {
//                if (data.title == "Order pick up by hawker please track your order")
//                {
//                    this.showMap = true;
//                }
//                else
//                {
//                    this.showMap = false;
//                }
//            })
        })
    }
}
