import { Component, OnInit } from '@angular/core';
import {ApplyCouponProvider} from './apply-coupon.provider';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-apply-coupon',
    templateUrl: './apply-coupon.component.html',
    styleUrls: ['./apply-coupon.component.scss']
})
export class ApplyCouponComponent implements OnInit {
    showLoading: boolean = false;
    offersList: any[];
    cityName: string;
    stateName: string;
    countryName: string;
    constructor(public provider: ApplyCouponProvider, public dialogRef: MatDialogRef<ApplyCouponComponent>,) {}

    async ngOnInit() {
        this.showLoading = true;
        await this.getUserLocation();
    }
    
    getUserLocation()
    {
        return this.provider.getUserLocation().then(async (list: any) =>
        {
            await list.results.forEach((data: Address) => 
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
            await this.getOfferList();
        }).catch(error =>
        {
            console.log(error);
        })
    }
    
    getOfferList()
    {
        this.provider.getOffers(this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            this.offersList = list;
            this.showLoading = false;
        })
    }
    
    applyCoupun(Obj)
    {
        this.dialogRef.close(Obj);
    }
    
}
