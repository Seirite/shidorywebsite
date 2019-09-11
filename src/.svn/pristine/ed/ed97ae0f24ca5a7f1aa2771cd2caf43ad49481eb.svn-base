/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {FIRE_ADD_RESTAURANT_MST_REF} from '../../pojos/ADD_RESTRAUNT_MST';



@Injectable()

export class VerificationDialogProvider {
    
    constructor(private serviceFirestore: firestoreService) {
    }
    
    get windowRef() {
        return window
    }
    
    saveCity(saveObj, country, state)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES"), saveObj, saveObj.key).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    saveZone(saveObj, country, state, city)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE"), saveObj, saveObj.key).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    saveRestraunt(saveObj, country, state, city)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection(FIRE_ADD_RESTAURANT_MST_REF.RESTAURANT_MST), saveObj, saveObj.key).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
  
  
   

}