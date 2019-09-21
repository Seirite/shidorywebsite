/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class ViewDetailProvider {
    constructor(private serviceFirestore: firestoreService) {
    }
    
    getUserOrderList(country, state, city, zoneKey, orderKey)
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
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
    
    getRestroUserData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key)
    }
   
    getHawkerData(country, state, city, zoneKey, hawkerKey)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(zoneKey).collection("HAWKER"), hawkerKey)
    }
    
    getHawkerLocation(country: string, state: string, city: string, zoneKey: string, hawkerKey: string)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(zoneKey).collection("HAWKER", ref => ref
            .where("key", "==", hawkerKey)
        ))
    }
   

}