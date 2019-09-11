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
        this.provider.getUserOrderList(this.countryName, this.stateName, this.cityName, restroData.RESTRO_LOCATION.geohash.substring(0,5), this.selectOrderKey).subscribe(async (list: ADD_ORDER_MST[]) =>
        {
            this.trackOrderObject = list[0];
            this.userOTP = list[0].RESTRO_USER_OTP;
            this.deliveryStatusList = list[0].ORDER_STATUS_ARRAY.reverse();
            this.destination = {
                lat: list[0].SELECT_ADDRESS_GEOPOINT_LATITUDE,
                lng: list[0].SELECT_ADDRESS_GEOPOINT_LONGITUDE
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
