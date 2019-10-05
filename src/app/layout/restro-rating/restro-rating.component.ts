import { Component, OnInit } from '@angular/core';
import {RestroRatingProvider} from './restro-rating.provider';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';
import {AuthService} from '../../utility/auth-service';

@Component({
    selector: 'app-restro-rating',
    templateUrl: './restro-rating.component.html',
    styleUrls: ['./restro-rating.component.scss']
})
export class RestroRatingComponent implements OnInit {
    restoUserName: string;
    RESTRO_RATING: any;
    restroImage: string;
    restroName: string;
    cityName: string;
    stateName: string;
    countryName: string;
    userReview: string;
    constructor(public provider: RestroRatingProvider, public dialogRef: MatDialogRef<RestroRatingComponent>, public auth: AuthService, private snackBar: MatSnackBar) {}

    async ngOnInit() {
        this.restoUserName = this.auth.getSession().displayName.split("@")[0];
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
    
    checkIfRestroUserWriteCommentOrNot()
    {
        if (this.userReview && this.RESTRO_RATING)
        {
            this.getRestroRating(this.RESTRO_RATING)
        }
        else
        {
            var message = "Write Your Commit";
            var action = "";
            this.openSnackBarAddress(message, action);
        }
    }
    
    setRestroRating($event)
    {
        this.RESTRO_RATING = $event;
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
                this.saveRestroUserReview();
            }).catch(error =>
            {
                this.dialogRef.close();
            })
        }).catch(error =>
        {
            console.log(error);
        })
    }
    
    saveRestroUserReview()
    {
        this.provider.getRestroUserData(this.auth.getSession().uid).then((restroUserData: any) =>
        {
            var restroUserName
            var restroUserPhoto = "assets/profile.png";
            if (typeof restroUserData.displayName == "undefined")
            {
                restroUserName = restroUserData.fullName
            }
            else 
            {
                restroUserName = restroUserData.displayName
            }
            if (restroUserData.photoURL)
            {
                restroUserPhoto = restroUserData.photoURL
            }
            var saveObj = {
                RESTRO_USER_KEY: this.auth.getSession().uid,
                RATING_VALUE: this.RESTRO_RATING,
                RESTRO_USER_NAME: restroUserName,
                RESTRO_USER_PHOTO: restroUserPhoto,
                RESTRO_USER_COMMIT: this.userReview
            }
            this.provider.saveRestrauntRating(saveObj, this.countryName, this.stateName, this.cityName, localStorage.getItem("restroKey")).then(uid =>
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
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
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
