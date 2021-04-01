/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {FIRE_ADD_ORDER_MST_REF} from '../../pojos/ADD_ORDER_MST';
import {FIRE_ADD_RESTAURANT_MST_REF} from '../../pojos/ADD_RESTRAUNT_MST';



@Injectable()

export class OrderConformProvider {
    
    constructor(private serviceFirestore: firestoreService) {
    }
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
    
    getUserOrderOTP(country, state, city, zoneKey, orderKey)
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
    
    checkUserAlreadySubmitFeedbackOrNot(restroUserKey, country, state, city, restroKey)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection(FIRE_ADD_RESTAURANT_MST_REF.RESTAURANT_MST).doc(restroKey).collection("RATINGS"), restroUserKey)
    }
   
}