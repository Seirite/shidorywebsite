import {Component, OnInit} from '@angular/core';
import {RatingViewProvider} from './rating-view.provider';
import {MatDialogRef} from '@angular/material';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-rating-view',
    templateUrl: './rating-view.component.html',
    styleUrls: ['./rating-view.component.scss']
})
export class RatingViewComponent implements OnInit {
    ratingList: any;
    cityName: string;
    stateName: string;
    countryName: string;
    constructor(public provider: RatingViewProvider, public dialogRef: MatDialogRef<RatingViewComponent>) {}

    async ngOnInit() {
        await this.getUserLocation();
        await this.getRestrauntRatingList();
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
    
    getRestrauntRatingList()
    {
        if (this.countryName)
        {
            this.provider.getRestaurantRatingList(this.countryName, this.stateName, this.cityName, localStorage.getItem("selectRestaurantKey")).subscribe(list =>
            {
                this.ratingList = list;
            })
        }
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
