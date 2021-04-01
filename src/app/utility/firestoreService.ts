/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
//import {firebase} from '@firebase/app';
import * as firebase from 'firebase/app';

import {Observable} from 'rxjs';
import {IdMst} from './IdMst';
import {AuthService} from './auth-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable()
export class firestoreService {
    
    constructor(public firestore: AngularFirestore, public auth: AuthService, public httpService: HttpClient) {
        this.getServerTimeInMillisecound();
    }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }


getSession()
{
    return this.auth.getSession();
}

    //    public saveDocumentToFireStore(collection: AngularFirestoreCollection<any>, obj: any, prefix: string) {
    //        const timestamp = this.timestamp;
    //        return new Promise((resolve, reject) => {
    //            if (prefix.trim().length == 3) {
    //                this.idGenrator(prefix).then(id => {
    //                    obj.key = id;
    //                    //                    obj.CR_DT = this.timestamp;   
    //                    console.log(JSON.parse(JSON.stringify(obj)));
    //                    collection.doc(id + "").set(JSON.parse(JSON.stringify(obj)))
    //                        .then(function () {
    //                            collection.doc(id + "").update({CR_DT: timestamp}).then(status => {
    //                                console.log("Document successfully written!");
    //                                resolve(id);
    //                            })
    //                        })
    //                        .catch(function (error) {
    //                            console.error("Error writing document: ", error);
    //                            reject("ERROR");
    //                        });
    //                })
    //
    //            }
    //            else {
    //                obj.key = prefix;
    //                console.log(JSON.parse(JSON.stringify(obj)));
    //                collection.doc(prefix + "").set(JSON.parse(JSON.stringify(obj)))
    //                    .then(function () {
    //                        collection.doc(prefix + "").update({CR_DT: timestamp}).then(status => {
    //                            console.log("Document successfully writt var collection= this.serviceFirestore.firestore.collection(TABLE_MST.name);en!");
    //                            resolve(prefix);
    //                        })
    //
    //                    })
    //                    .catch(function (error) {
    //                        console.error("Error writing document: ", error);
    //                        reject("ERROR");
    //                    });
    //
    //            }
    //
    //        })
    //
    //
    //    }
    public async saveDocumentToFireStoreNew(collection: AngularFirestoreCollection<any>, obj: any, prefix: string) {
        const CR_DT = this.timestamp;
        const timestamp = await this.getTimeUsingTimezone();
        return new Promise((resolve, reject) => {
            if (prefix.trim().length == 3) {
                this.idGenrator(prefix).then(id => {
                    obj.key = id;
                    obj.SAVE_DT = timestamp;
                    obj.CR_DT = CR_DT;
                    collection.doc(id + "").set(Object.assign({}, obj))
                        .then(function () {
                            console.log("Document successfully written!");
                            resolve(id);
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            reject("ERROR");
                        });
                })

            }
            else {
                obj.key = prefix;
                obj.SAVE_DT = timestamp;
                obj.CR_DT = CR_DT;
                collection.doc(prefix + "").set(Object.assign({}, obj))
                    .then(function () {

                        console.log("Document successfully written!");
                        resolve(prefix);


                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        reject("ERROR");
                    });

            }

        })


    }

    modifyDocToFirestore(angularDocString: string, obj: any) {

//        obj.MD_DT = this.timestamp;
        obj.MD_DT = this.getTimeUsingTimezone();
        return this.firestore.doc(angularDocString).update(obj);

    }



    idGenrator(prefix) {
        return new Promise((resolve, reject) => {
            var idCollection = this.firestore.collection("IdMst");
            this.getDocumentObject(idCollection, prefix).then((idObj: IdMst) => {

                var idMst = new IdMst();
                idMst = idObj;
                idMst.max = idMst.max + 1;
                console.log("ID FOR " + prefix + "== " + idMst.prefix + idMst.max);

                this.updateIdManager(idCollection, idObj, prefix);
                resolve(idMst.prefix + idMst.max);


            }).catch(error => {
                console.log(error);
                reject("idGenrator Error");
            })
        })


    }

    public getDocumentObject(collection: AngularFirestoreCollection<any>, key: any) {
        return new Promise((resolve, reject) => {
            try {
                collection.doc(key).snapshotChanges()
                    .forEach(actions => {
//                        console.log(actions.payload.ref.path);
                        console.log(actions.payload.exists);

                        const data = actions.payload.data() as any;
                        //                    const id = actions.payload.id;
                        //                    const obj ={id, data};
                        resolve(data);


                    });
            } catch (error) {
                console.log("hellooooooo");
                reject("ERROR");
            }

        })


    }

    updateIdManager(collection: AngularFirestoreCollection<any>, data: IdMst, prefix) {
        return new Promise((resolve, reject) => {
            collection.doc(prefix).update(data);
            resolve("SUCCESS");
        })
    }


    public getListFromFireStore(collection: AngularFirestoreCollection<any>): Observable<any> {
        return collection.valueChanges();
    }

    public getCount(collection: AngularFirestoreCollection<any>) {
        return new Promise((resolve, reject) => {
            collection.ref.get().then(function (querySnapshot) {
                console.log(querySnapshot.size);
                resolve(querySnapshot.size);
            }).catch(error=>{
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
                this.httpService.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude+"&key=AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs&sensor=true").subscribe((list: any) =>
                {
                    resolve(list.results);
                },
                error =>
                {
                    reject(error);
                })
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
    
    getServerTimeInMillisecound()
    {
        return new Promise((resolve, reject) =>
        {
            var offsetRef = firebase.database().ref(".info/serverTimeOffset");
            offsetRef.on("value", function (snap) {
                var offset = snap.val();
                var estimatedServerTimeMs = new Date().getTime() + offset;
                resolve(estimatedServerTimeMs);
            });
        })

    }
    
    getCountryTimezone(latitude, longitude)
    {
        if (latitude != null && longitude != null)
        {
            var targetDate = new Date() // Current date/time of user computer
            var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
            return new Promise((resolve, reject) => 
            {
                this.httpService.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + latitude + ", " + longitude + "&timestamp=" + timestamp + "&key=AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs").subscribe((list: any) => 
                {
                    resolve(list);
                },
                error => 
                {
                    reject(error);
                })
            })
        }
        else
        {
            console.log("lat, log not found");
        }
    }
    
    async getTimeUsingTimezone()
    {
        var time: any = await this.getServerTimeInMillisecound();
        return new Promise((resolve, reject) =>
        {
            let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/getTimeZone`
            let httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            let body = {
                "Info":
                    {
                        "milisecond": time,
                        "timeZone": localStorage.getItem("timeZoneId"),
                    }
            };
            return this.httpService.post(url, body, httpOptions)
                .toPromise()
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    if (typeof err.error.text != "undefined") 
                    {
                        resolve(err.error.text);
                    }
                    else
                    {
                        reject("error");
                    }
                })
        })
    }
    
    
   
}