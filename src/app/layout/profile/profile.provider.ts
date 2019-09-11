/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {HttpClient} from '@angular/common/http';



@Injectable()

export class ProfileProvider {
    
    constructor(private serviceFirestore: firestoreService, public httpService: HttpClient) {
    }
    
    getRestroUserData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key);
    }
    
    getRestroUserOrder(key, country, state, city)
    {
        return new Promise((resolve, reject) =>
        {
            return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER").doc(key).collection("ORDER_MST", ref => ref
                .orderBy("CR_DT", "desc")
            )).forEach(data =>
            {
                data.forEach(restroUserOrderData =>
                {
                    this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST", ref => ref
                        .where("key", "==", restroUserOrderData.RESTAURENT_ID)
                    ).valueChanges().forEach((restroData: any[]) =>
                    {
                        if (restroData.length != 0)
                        {
                            this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(restroData[0].RESTRO_LOCATION.geohash.substring(0, 5)).collection("ORDER_MST", ref => ref
                                .where("key", "==", restroUserOrderData.key)
                            ).valueChanges().forEach((restroUserOrder: any[]) => 
                            {
                                if (restroUserOrder.length != 0) 
                                {
                                    if (restroUserOrder[0].ORDER_STATUS) 
                                    {
                                        restroUserOrderData.ORDER_STATUS = restroUserOrder[0].ORDER_STATUS;
                                    }
                                    if (restroUserOrder[0].HAWKER_STATUS) 
                                    {
                                        restroUserOrderData.HAWKER_STATUS = restroUserOrder[0].HAWKER_STATUS;
                                    }
                                    restroUserOrderData.DELIVERD = restroUserOrder[0].DELIVERD;
                                }
                            })
                        }
                        else
                        {
                            console.log("Restro Not Found");
                        }
                    })
                });
                resolve(data);
            })
        })
    }
    
    getRestroUserLatestOrder(key, country, state, city)
    {
        return new Promise((resolve, reject) =>
        {
            return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER").doc(key).collection("ORDER_MST", ref => ref
                .orderBy("CR_DT", "desc")
                .limit(4)
            )).forEach(data =>
            {
                data.forEach(restroUserOrderData =>
                {
                    this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST", ref => ref
                        .where("key", "==", restroUserOrderData.RESTAURENT_ID)
                    ).valueChanges().forEach((restroData: any[]) =>
                    {
                        if (restroData.length != 0)
                        {
                            this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(restroData[0].RESTRO_LOCATION.geohash.substring(0, 5)).collection("ORDER_MST", ref => ref
                                .where("key", "==", restroUserOrderData.key)
                            ).valueChanges().forEach((restroUserOrder: any[]) => 
                            {
                                if (restroUserOrder.length != 0) 
                                {
                                    if (restroUserOrder[0].ORDER_STATUS) 
                                    {
                                        restroUserOrderData.ORDER_STATUS = restroUserOrder[0].ORDER_STATUS;
                                    }
                                    if (restroUserOrder[0].HAWKER_STATUS) 
                                    {
                                        restroUserOrderData.HAWKER_STATUS = restroUserOrder[0].HAWKER_STATUS;
                                    }
                                    restroUserOrderData.DELIVERD = restroUserOrder[0].DELIVERD;
                                }
                            })
                        }
                        else
                        {
                            console.log("Restro Not Found");
                        }
                    })
                });
                resolve(data);
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
    
    updateOrderToRestaurant(Obj: any)
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
    
    saveRestroUserCardInformation(saveObj)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection(""), saveObj, saveObj.ORDER_ID).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    getRestaurantsData(country, state, city, selectRestrauntKey)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(selectRestrauntKey).valueChanges().subscribe(list =>
            {
                if (typeof list == "undefined")
                {
                    reject("ERROR");
                }
                else
                {
                    resolve(list);
                }
            })
        })
    }
    
    deleteRestroUserOrderFromUserSide(key, orderId)
    {
        return this.serviceFirestore.firestore.collection("RESTRO_USER").doc(key).collection("ORDER_MST").doc(orderId).delete();
    }
    
    deleteRestroUserOrderFromZone(country, state, city, zoneKey, orderId)
    {
        return this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(zoneKey).collection("ORDER_MST").doc(orderId).delete();
    }
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
    
    
    

}