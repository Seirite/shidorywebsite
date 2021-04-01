/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';



@Injectable()

export class AboutProvider {
    
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
    
    getFormatedAddress(lat, lng)
    {
        return new Promise((resolve, reject) =>
        {
            this.httpService.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs&sensor=true").subscribe(list =>
            {
                resolve(list);
            },
            error =>
            {
                reject(error);
            })
        })
    }
    
    getCountryReport(countryName)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(countryName).collection("COUNTRY_REPORT", ref => ref
            .where("key", "==", "COUNTRY")
        ));
    }
    
    getNumberOfOrder(countryName)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(countryName).collection("COMMISSION_TRACK_MST"));
    }
    
    getNumberOfVisitors()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER"));
    }
    
    getCountiesList()
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY"))
    }
    
   

}