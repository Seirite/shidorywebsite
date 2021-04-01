/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';



@Injectable()

export class VerificationErrorDialogProvider {
    
    constructor(private serviceFirestore: firestoreService) {
    }
    

}