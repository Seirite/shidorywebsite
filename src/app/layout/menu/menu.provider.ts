/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';



@Injectable()

export class MenuProvider {
    
    constructor(private serviceFirestore: firestoreService, public httpService: HttpClient) {
    }
    
    getPosition(): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            navigator.geolocation.getCurrentPosition(resp => 
            {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => 
            {
                reject(err);
            });
        });

    }
    
    saveCarrerFormInfo(saveObj)
    {
        return this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("CARRER"), saveObj, "RMI")
    }
    
    getPositionApplyList()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("CARRER_POSITION"));
    }
   
}