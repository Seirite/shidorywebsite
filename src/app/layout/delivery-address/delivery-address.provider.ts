/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';



@Injectable()

export class DeliveryAddressProvider {
    constructor(private serviceFirestore: firestoreService){}
    
    getRestroUserData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key);
    }
    
    updateOrderToRestaurant(Obj: ADD_ORDER_MST)
    {
        return new Promise((resolve,reject) =>
        {
            this.serviceFirestore.firestore.collection("RESTRO_USER").doc(Obj.key).update(Obj).then(success =>
            {
                resolve("SUCCESS")
            }).catch(error =>
            {
                reject(error);
            })
        })
    }

}