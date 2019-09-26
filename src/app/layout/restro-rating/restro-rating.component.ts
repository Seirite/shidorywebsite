import { Component, OnInit } from '@angular/core';
import {RestroRatingProvider} from './restro-rating.provider';
import {MatDialogRef} from '@angular/material';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';

@Component({
    selector: 'app-restro-rating',
    templateUrl: './restro-rating.component.html',
    styleUrls: ['./restro-rating.component.scss']
})
export class RestroRatingComponent implements OnInit {
    restroImage: string;
    restroAreaName: string;
    restroName: string;
    cityName: string;
    stateName: string;
    countryName: string;
    constructor(public provider: RestroRatingProvider, public dialogRef: MatDialogRef<RestroRatingComponent>) {}

    async ngOnInit() {
        await this.getUserLocation();
        await this.getRestroData();
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
    
    getRestroData()
    {
        if (this.countryName)
        {
            this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey")).then((restroObject: ADD_RESTAURANT_MST) =>
            {
                this.restroName = restroObject.RESTRO_NAME;
                this.restroAreaName = restroObject.RESTRO_AREA_NAME;
                if (restroObject.RESTRO_IMAGE)
                {
                    this.restroImage = restroObject.RESTRO_IMAGE;
                }
                else
                {
                    this.restroImage = "https://nrai.org/site/wp-content/uploads/2017/12/chinese-buffet-near-me.jpg";
                }
            }).catch(error =>
            {
                console.log(error);
            })
        }
    }
    
    getRestroRating($event)
    {
        this.provider.getRestaurantsData(this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey")).then((restroObject: ADD_RESTAURANT_MST) =>
        {
            if ($event == 1)
            {
                if (isNaN(restroObject.RESTRO_RATING_ONE))
                {
                    restroObject.RESTRO_RATING_ONE = 0 + 1;
                }
                else
                {
                    restroObject.RESTRO_RATING_ONE = restroObject.RESTRO_RATING_ONE + 1;
                }
            }
            if ($event == 2)
            {
                if (isNaN(restroObject.RESTRO_RATING_TWO))
                {
                    restroObject.RESTRO_RATING_TWO = 0 + 1;
                }
                else
                {
                    restroObject.RESTRO_RATING_TWO = restroObject.RESTRO_RATING_TWO + 1;
                }
            }
            if ($event == 3)
            {
                if (isNaN(restroObject.RESTRO_RATING_THREE))
                {
                    restroObject.RESTRO_RATING_THREE = 0 + 1;
                }
                else
                {
                    restroObject.RESTRO_RATING_THREE = restroObject.RESTRO_RATING_THREE + 1;
                }
            }
            if ($event == 4)
            {
                if (isNaN(restroObject.RESTRO_RATING_FOUR))
                {
                    restroObject.RESTRO_RATING_FOUR = 0 + 1;
                }
                else
                {
                    restroObject.RESTRO_RATING_FOUR = restroObject.RESTRO_RATING_FOUR + 1;
                }
            }
            if ($event == 5)
            {
                if (isNaN(restroObject.RESTRO_RATING_FIVE))
                {
                    restroObject.RESTRO_RATING_FIVE = 0 + 1;
                }
                else
                {
                    restroObject.RESTRO_RATING_FIVE = restroObject.RESTRO_RATING_FIVE + 1;
                }
            }
            this.provider.saveRating(this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey"), restroObject).then(uid =>
            {
                this.dialogRef.close();
            }).catch(error =>
            {
                this.dialogRef.close();
            })
        }).catch(error =>
        {
            console.log(error);
        })
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
