/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';



@Injectable()

export class ContactProvider {
    
    constructor(private serviceFirestore: firestoreService, public httpService: HttpClient) {
    }
    
    saveEnquiry(saveObj)
    {
        return this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("ENQUIRY"), saveObj, "RMI")
    }
   

}