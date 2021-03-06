/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class LoginProvider {
    
    constructor(private serviceFirestore: firestoreService) {
    }
    
    get windowRef() {
        return window
    }
    
    saveRestraunt(saveObj)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("RESTRO_USER"), saveObj, saveObj.uid).then(key =>
            {
                resolve("SUCCESS");
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    saveRestroUser(saveObj)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("RESTRO_USER"), saveObj, saveObj.uid).then(key =>
            {
                resolve("SUCCESS");
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    getRestroUserData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key)
    }
    
    getCountryList()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY"));
    }

}