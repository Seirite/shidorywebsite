/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class HomeProvider {
    constructor(public serviceFirestore: firestoreService, public httpService: HttpClient) {
    }
    
    getRestaurantsMenuItemList(country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST", ref => ref
            .where("RESTRO_ISAPROVAL", "==", true)
            .where("DEFAUNT", "==", false)
        ));
    }
    
    getMenuItemRestaurantWiseList(RESTAURENT_ID, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST", ref => ref
            .where("key", "==", RESTAURENT_ID)
            .where("RESTRO_ISAPROVAL", "==", true)
            .where("DEFAUNT", "==", false)
        ))
    }
    
    getMenuItemList()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTAURENT_MENU_ITEM_MST"))
    }
    
    getPosition(): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            navigator.geolocation.getCurrentPosition(resp => 
            {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => 
            {
                reject(err);
            });
        });

    }
    
    getFormatedAddress(lat, lng)
    {
        return new Promise((resolve, reject) =>
        {
            this.httpService.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs&sensor=true").subscribe(list =>
            {
                resolve(list);
            },
            error =>
            {
                reject(error);
            })
        })
    }
    
    setUserFormatedAddress(lat, lng)
    {
        localStorage.setItem("lat", lat);
        localStorage.setItem("lng", lng);
    }
    
    getCitesWeServe(country, state)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES"))
    }
    
    getCountiesList()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY"))
    }
    
    getUserOrder(country, state, city, zoneKey, orderKey)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(zoneKey).collection("ORDER_MST", ref => ref
            .where("key", "==", orderKey)
        ));
    }
    
    getRestaurantsData(country, state, city, selectRestrauntKey)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(selectRestrauntKey).valueChanges().subscribe(list =>
            {
                if (typeof list == "undefined")
                {
                    reject("ERROR");
                }
                else
                {
                    resolve(list);
                }
            })
        })
    }
    
    getTimezoneAccordingUser(latitude, longitude)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.getCountryTimezone(latitude, longitude).then((list: any) =>
            {
                resolve(list.timeZoneId);
            },
            error =>
            {
                reject(error);
            })
        })
    }
    
    
}