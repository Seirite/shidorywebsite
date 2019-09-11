/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class ShopDetailProvider {
   
    constructor(private serviceFirestore: firestoreService) {
    }
    
    getRestroData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTAURANT_MST"), key);
    }
    
    getRestroWiseMenuList(key)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTAURENT_MENU_ITEM_MST", ref => ref
            .where("RESTAURENT_ID", "==", key)
        ));
    }
    
    getCategoryName(menuCategorykey)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("MTYPE_MST", ref => ref
            .where("key", "==", menuCategorykey)
        ));
    }
    
    getMenuData(menuItemKey)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTAURENT_MENU_ITEM_MST"), menuItemKey);
    }
    
    

}
