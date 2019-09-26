/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class ShopProvider {
    
    constructor(public serviceFirestore: firestoreService) {
    }
    
    getRestroData(key, country, state, city)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST"), key);
    }
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
    
    getRestroWiseMenuList(key, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(key).collection("RESTAURENT_MENU_ITEM_MST", ref => ref
            .where("DEFUNCT", "==", false)
        ));
    }
    
    getCategoryName(menuCategorykey, country)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("MTYPE_MST", ref => ref
            .where("key", "==", menuCategorykey)
            .where("DEFUNCT", "==", false)
        ));
    }
    
    getRestaurantWiseCategoryFilter(key, menuCategorykey, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(key).collection("RESTAURENT_MENU_ITEM_MST", ref => ref
            .where("MENU_ITEM_TYPE", "==", menuCategorykey)
            .where("DEFUNCT", "==", false)
        ));
    }
    
    getRestaurantWiseMainCategoryFilter(key, menuCategorykey, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(key).collection("RESTAURENT_MENU_ITEM_MST", ref => ref
            .where("MENU_ITEM_CATEGORY", "==", menuCategorykey)
            .where("DEFUNCT", "==", false)
        ));
    }
    
    getMenuItemSearch(key, menuKey, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(key).collection("RESTAURENT_MENU_ITEM_MST", ref => ref
            .where("MENU_ITEM_KEY", "==", menuKey)
            .where("DEFUNCT", "==", false)
        ));
    }
    
    getUserCurrency(country)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY", ref => ref
            .where("key", "==", country)
        ));
    }
    
    getRestroUserObj(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key);
    }
    
    
   

}