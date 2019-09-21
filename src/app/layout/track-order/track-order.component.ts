import { Component, OnInit } from '@angular/core';
import {TrackOrderProvider} from './track-order.provider';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
    userOrderStatus: any;
    totalPrice: string;
    coupanValue: string;
    deliveryFee: string;
    userPaymentAmount: string;
    restroImage: any;
    userMenuItem: any[];
    restroAreaName: any;
    restroName: any;
    userOTP: any;
    deliveryStatusList: any;
    myStepEditable = false;
    lat: number;
    lng: number;
    origin: any;
    destination: any;
    selectRestaurantKey: string;
    selectOrderKey: string;
    cityName: string;
    stateName: string;
    countryName: string;
    zoom: number = 17;
    show: boolean = true;
    showMap: boolean = false;
    trackOrderObject: ADD_ORDER_MST;
    
    constructor(public provider: TrackOrderProvider, public dialogRef: MatDialogRef<TrackOrderComponent>) {}

    async ngOnInit() {
        this.trackOrderObject = new ADD_ORDER_MST();
        this.selectOrderKey = localStorage.getItem("selectOrderKey")
        this.selectRestaurantKey = localStorage.getItem("selectRestaurantKey")
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
        var restroData: any = await this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, this.selectRestaurantKey);
        this.origin = {
            lat: restroData.RESTRO_LOCATION.geopoint.latitude,
            lng: restroData.RESTRO_LOCATION.geopoint.longitude
        }
        this.restroName = restroData.RESTRO_NAME
        this.restroAreaName = restroData.RESTRO_AREA_NAME
        this.restroImage = restroData.RESTRO_IMAGE
        this.provider.getUserOrderList(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0,5), this.selectOrderKey).subscribe(async (list: ADD_ORDER_MST[]) =>
        {
            this.trackOrderObject = list[0];
            this.userMenuItem = list[0].MENUCART;
            this.userOTP = list[0].RESTRO_USER_OTP;
            this.deliveryStatusList = list[0].ORDER_STATUS_ARRAY.reverse();
            this.destination = {
                lat: list[0].SELECT_ADDRESS_GEOPOINT_LATITUDE,
                lng: list[0].SELECT_ADDRESS_GEOPOINT_LONGITUDE
            }
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
            this.coupanValue = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
            this.totalPrice = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_TOTAL;
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
        })
    }
    
    
//    async trackOrder()
//    {
//        var session = await this.provider.auth.getSessionObj();
//        this.provider.getUserOrderList(session.fireuser.uid, this.orderId).subscribe(async (list: ADD_ORDER_MST[]) =>
//        {
//            this.address = list[0].SELECT_ADDRESS
//            this.userMenuItem = list[0].MENUCART;
//            this.userPaymentType = list[0].PAYMENT_TYPE;
//            this.orderDate = list[0].CR_DT.split(' ')[2];
//            this.orderMonth = list[0].CR_DT.split(' ')[1];
//            this.coupanName = list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME;
//            this.deliveryFee = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_CHARGES;
//            this.coupanValue = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
//            this.totalPrice = list[0].RESTRO_USER_CART_CURRENCY + " " + list[0].RESTRO_USER_CART_TOTAL;
//            if (list[0].RESTRO_USER_CART_COUPON_DISCOUNT_NAME != 0)
//            {
//                var userPaymentAmount = list[0].RESTRO_USER_CART_TOTAL - list[0].RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT;
//                var totalPrice = userPaymentAmount + list[0].RESTRO_USER_CART_CHARGES;
//                this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
//            }
//            else
//            {
//                var totalPrice = list[0].RESTRO_USER_CART_TOTAL + list[0].RESTRO_USER_CART_CHARGES;
//                this.userPaymentAmount = list[0].RESTRO_USER_CART_CURRENCY + " " + totalPrice;
//            }
//            var restroData: any = await this.provider.getRestaurantsData(localStorage.getItem("countryName"), localStorage.getItem("stateName"), localStorage.getItem("cityName"), list[0].RESTAURENT_ID);
//            this.restroName = restroData.RESTRO_NAME
//            this.restroAreaName = restroData.RESTRO_AREA_NAME
//            await this.provider.getUserOrder(localStorage.getItem("countryName"), localStorage.getItem("stateName"), localStorage.getItem("cityName"), restroData.RESTRO_LOCATION.geohash.substring(0, 5), this.orderId).subscribe(async (list: ADD_ORDER_MST[]) =>
//            {
//                if (list.length != 0)
//                {
//                    this.deliveryStatusList = list[0].ORDER_STATUS_ARRAY.reverse();
//                    this.userOTP = list[0].RESTRO_USER_OTP;
//                    this.coupanTotal = list[0].RESTRO_USER_CART_DISCOUNT_TOTAL;
//                    if (list[0].DELIVERD == true) 
//                    {
//                        this.userOrderStatus = "DELIVERD";
//                    }
//                    else 
//                    {
//                        if (list[0].HAWKER_STATUS) 
//                        {
//                            this.userOrderStatus = list[0].HAWKER_STATUS;
//                        }
//                        else 
//                        {
//                            this.userOrderStatus = list[0].ORDER_STATUS;
//                        }
//                    }
//                    if (list[0].HAWKER_KEY) 
//                    {
//                        var hawkerObj: any = await this.provider.getHawkerObj(localStorage.getItem("countryName"), localStorage.getItem("stateName"), localStorage.getItem("cityName"), restroData.RESTRO_LOCATION.geohash.substring(0, 5), list[0].HAWKER_KEY);
//                        this.hawkerName = hawkerObj.HAWKER_FIRST_NAME + " " + hawkerObj.HAWKER_LAST_NAME
//                        this.hawkerImage = hawkerObj.HAWKER_DRIVING_LICENCE_IMG
//                    }
//                }
//            })
//        })
//    }
    
    
}
