/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class CustomisableDialogProvider {
    
    constructor(public serviceFirestore: firestoreService) {
    }
    
    getRestroMenuItemData(key, country, state, city, restroKey)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(restroKey).collection("RESTAURENT_MENU_ITEM_MST"), key);
    }
    
    getCountryObj(country)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY"), country);
    }
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
   

}