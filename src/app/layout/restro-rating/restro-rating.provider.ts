/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {FIRE_ADD_RESTAURANT_MST_REF} from '../../pojos/ADD_RESTRAUNT_MST';



@Injectable()

export class RestroRatingProvider {
    
    constructor(private serviceFirestore: firestoreService) {
    }
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
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
    
    saveRating(country, state, city, selectRestrauntKey, restroObj)
    {
        return this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(selectRestrauntKey).update(restroObj)
    }
    
    saveRestrauntRating(saveObj, country, state, city, restroKey)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection(FIRE_ADD_RESTAURANT_MST_REF.RESTAURANT_MST).doc(restroKey).collection("RATINGS"), saveObj, saveObj.RESTRO_USER_KEY).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    getRestroUserData(restroUserKey)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), restroUserKey)
    }
   
}