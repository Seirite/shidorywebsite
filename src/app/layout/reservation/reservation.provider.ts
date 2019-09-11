/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';
import {FIRE_ADD_RESTAURANT_MST_REF} from '../../pojos/ADD_RESTRAUNT_MST';



@Injectable()

export class ReservationProvider {
    
    constructor(private serviceFirestore: firestoreService, public httpService: HttpClient) {
    }
    
    get windowRef() {
        return window
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
    
    getCountryObject(id)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY", ref => ref
            .where("key", "==", id)
        ))
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
    
    getTimezoneAccordingUser(latitude, longitude)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.getCountryTimezone(latitude, longitude).then((list: any) =>
            {
                resolve(list.timeZoneId);
            },
            error =>
            {
                reject(error);
            })
        })
    }
    
    
}