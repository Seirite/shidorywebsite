import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../cart/cart.component';
import {ViewDetailProvider} from './view-detail.provider';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {AuthService} from '../../utility/auth-service';

@Component({
    selector: 'app-view-detail',
    templateUrl: './view-detail.component.html',
    styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
    restroImage: any;
    restroAreaName: any;
    restroName: any;
    deliveryFee: string;
    userOrderStatus: string;
    userPaymentAmount: string;
    userMenuItem: any[];
    couponName: number;
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
    constructor(public dialogRef: MatDialogRef<ViewDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public provider: ViewDetailProvider, public auth: AuthService,) {}

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
        this.restroName = restroData.RESTRO_NAME
        this.restroAreaName = restroData.RESTRO_AREA_NAME
        this.restroImage = restroData.RESTRO_IMAGE
        this.provider.getUserOrderList(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), this.data.ORDER_ID).subscribe(async (list: ADD_ORDER_MST[]) =>
        {
            if (list.length != 0)
            {
                this.orderId = list[0].ORDER_ID;
                this.selectAddress = list[0].SELECT_ADDRESS;
                this.totalPrice = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_TOTAL;
                this.couponName = list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME;
                this.userOTP = list[0].RESTRO_USER_OTP;
                this.deliveryStatusList = list[0].ORDER_STATUS_ARRAY.reverse();
                this.destination = {
                    lat: list[0].SELECT_ADDRESS_GEOPOINT_LATITUDE,
                    lng: list[0].SELECT_ADDRESS_GEOPOINT_LONGITUDE
                }
                this.userMenuItem = list[0].MENUCART;
                if (list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME != 0) 
                {
                    var userPaymentAmount = list[0].RESTRO_USER_CART_TOTAL - list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
                    var totalPrice = userPaymentAmount + list[0].RESTRO_USER_CART_CHARGES;
                    this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
                }
                else 
                {
                    var totalPrice = list[0].RESTRO_USER_CART_TOTAL + list[0].RESTRO_USER_CART_CHARGES;
                    this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
                }
                this.deliveryFee = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_CHARGES;
                this.discountAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
                if (list[0].DELIVERD == true) 
                {
                    this.userOrderStatus = "DELIVERD";
                }
                else 
                {
                    if (list[0].HAWKER_STATUS) 
                    {
                        this.userOrderStatus = list[0].HAWKER_STATUS;
                    }
                    else 
                    {
                        this.userOrderStatus = list[0].ORDER_STATUS;
                    }
                }
                if (list[0].HAWKER_STATUS == "TAKEN" && list[0].DELIVERD == false) 
                {
                    this.provider.getHawkerLocation(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0, 5), list[0].HAWKER_KEY).subscribe((hawkerLocationObj: any) => 
                    {
                        this.origin = {
                            lat: hawkerLocationObj[0].HAWKER_LAT,
                            lng: hawkerLocationObj[0].HAWKER_LANG
                        }
                    })
                }
            }
            else
            {
                this.provider.getRestroUserOrderList(this.auth.getSession().uid, this.data.ORDER_ID).subscribe((list: ADD_ORDER_MST[]) =>
                {
                    this.userMenuItem = list[0].MENUCART;
                    this.orderId = list[0].ORDER_ID;
                    this.selectAddress = list[0].SELECT_ADDRESS;
                    this.totalPrice = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_TOTAL;
                    this.couponName = list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME;
                    this.deliveryFee = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_CHARGES;
                    this.discountAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
                    if (list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME != 0) 
                    {
                        var userPaymentAmount = list[0].RESTRO_USER_CART_TOTAL - list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
                        var totalPrice = userPaymentAmount + list[0].RESTRO_USER_CART_CHARGES;
                        this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
                    }
                    else 
                    {
                        var totalPrice = list[0].RESTRO_USER_CART_TOTAL + list[0].RESTRO_USER_CART_CHARGES;
                        this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
                    }
                })
            }
        })
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
