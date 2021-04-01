/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class MobileNoDialogProvider {
    
    constructor(public serviceFirestore: firestoreService) {
    }
    
    getRestroUserObj(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key);
    }
    
    updateRestroUser(Obj: any)
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
    
    checkWeatherMobileNoIsAlreadyLinkOrNot(phoneNumber: any)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER", ref => ref
                .where("phoneNumber", "==", phoneNumber)
            )).subscribe((list: any[]) =>
            {
                if (list.length > 0)
                {
                    reject(list[0]);
                }
                if (list.length == 0)
                {
                    resolve("NDF");
                }
            })
        })
    }
    

}