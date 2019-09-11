/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import {firestoreService} from '../../utility/firestoreService';
import {FIRE_ADD_ORDER_MST_REF, ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';



@Injectable()

export class CartProvider {
    
    constructor(public serviceFirestore: firestoreService) {
    }
    
    getMenuItemList(key, country, state, city)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST").doc(key).collection("RESTAURENT_MENU_ITEM_MST"));
    }
    
    sendOrderToZone(saveObj: ADD_ORDER_MST,key, country, state, city)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("ZONE").doc(key).collection(FIRE_ADD_ORDER_MST_REF.ORDER_MST), saveObj, saveObj.ORDER_ID).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    sendOrderToUserSide(saveObj: ADD_ORDER_MST,key)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.saveDocumentToFireStoreNew(this.serviceFirestore.firestore.collection("RESTRO_USER").doc(saveObj.RESTRO_USER_ID).collection(FIRE_ADD_ORDER_MST_REF.ORDER_MST), saveObj, saveObj.ORDER_ID).then(key =>
            {
                resolve(key);
            }).catch(error =>
            {
                reject(error);
            })
        })
    }
    
    getRestroUserData(key)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("RESTRO_USER"), key);
    }
    
    updateOrderToRestaurant(Obj: ADD_ORDER_MST)
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
    
    getUserLocation()
    {
        var lat = localStorage.getItem("lat")
        var lng = localStorage.getItem("lng")
        return this.serviceFirestore.getFormatedAddress(lat, lng)
    }
    
    getRestroData(key, country, state, city)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("RESTAURANT_MST"), key)
    }
    
    getDeliveryScheme(country)
    {
        return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("DELIEVERY_SCHEME"))
    }
    
    getApplyCoupunOffer(country, state, city, coupunApply, billAmount, restroUserAppliedCoupunCount)
    {
        return new Promise((resolve, reject) =>
        {
            var orderDiscountValue = 0;
            this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("STATES").doc(state).collection("CITIES").doc(city).collection("OFFERS_MST", ref => ref
                .where("key", "==", coupunApply.key)
                .where("DEFUNCT", "==", false)
            )).subscribe((list: any[]) =>
            {
                if (list.length != 0)
                {
                    if (list[0].USER_ORDER_LIMIT)
                    {
                        if (list[0].USER_ORDER_LIMIT > restroUserAppliedCoupunCount)
                        {
                            if ("<=" == list[0].OFFER_CONDITION) 
                            {
                                if (list[0].OFFER_ORDER_PRICE <= billAmount) 
                                {
                                    if (list[0].DISCOUNT_TYPE == "PERCENTAGE") 
                                    {
                                        orderDiscountValue = billAmount - (billAmount * (list[0].DISCOUNT) / 100);
                                    }
                                    if (list[0].DISCOUNT_TYPE == "AMOUNT") 
                                    {
                                        orderDiscountValue = list[0].DISCOUNT;
                                    }
                                    resolve(orderDiscountValue);
                                }
                                else 
                                {
                                    reject("NVC");
                                }
                            }
                            else if (">=" == list[0].OFFER_CONDITION) 
                            {
                                if (list[0].OFFER_ORDER_PRICE >= billAmount) 
                                {
                                    if (list[0].DISCOUNT_TYPE == "PERCENTAGE") 
                                    {
                                        orderDiscountValue = billAmount - (billAmount * (list[0].DISCOUNT) / 100);
                                    }
                                    if (list[0].DISCOUNT_TYPE == "AMOUNT") 
                                    {
                                        orderDiscountValue = list[0].DISCOUNT;
                                    }
                                    resolve(orderDiscountValue);
                                }
                                else 
                                {
                                    reject("NVC");
                                }
                            }

                        }
                        else
                        {
                            reject("NVC");
                        }
                    }
                    else
                    {
                        if (1 > restroUserAppliedCoupunCount)
                        {
                            if ("<=" == list[0].OFFER_CONDITION) 
                            {
                                if (list[0].OFFER_ORDER_PRICE <= billAmount) 
                                {
                                    if (list[0].DISCOUNT_TYPE == "PERCENTAGE") 
                                    {
                                        orderDiscountValue = billAmount - (billAmount * (list[0].DISCOUNT) / 100);
                                    }
                                    if (list[0].DISCOUNT_TYPE == "AMOUNT") 
                                    {
                                        orderDiscountValue = list[0].DISCOUNT;
                                    }
                                    resolve(orderDiscountValue);
                                }
                                else 
                                {
                                    reject("NVC");
                                }
                            }
                            else if (">=" == list[0].OFFER_CONDITION) 
                            {
                                if (list[0].OFFER_ORDER_PRICE >= billAmount) 
                                {
                                    if (list[0].DISCOUNT_TYPE == "PERCENTAGE") 
                                    {
                                        orderDiscountValue = billAmount - (billAmount * (list[0].DISCOUNT) / 100);
                                    }
                                    if (list[0].DISCOUNT_TYPE == "AMOUNT") 
                                    {
                                        orderDiscountValue = list[0].DISCOUNT;
                                    }
                                    resolve(orderDiscountValue);
                                }
                                else 
                                {
                                    reject("NVC");
                                }
                            }
                        }
                        else
                        {
                            reject("NVC");
                        }
                    }
                }
                else
                {
                    reject("NVC");
                }
            })
        })
    }
    
    getRestroUserAppliedCoupun(key, coupunKey)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER").doc(key).collection("ORDER_MST", ref => ref
                .where("RESTRO_USER_CART_COUPON_DISCOUNT_NAME", "==", coupunKey)
            )).subscribe((list: any[]) =>
            {
                resolve(list.length);
            })
        })
    }
    
    getOrderDistance(countryName)
    {
        return this.serviceFirestore.getDocumentObject(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY"), countryName)
    }
    
    checkApplyRules(country, distance, cartTotalPrice)
    {
        return new Promise((resolve, reject) =>
        {
            this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(country).collection("DELIEVERY_SCHEME")).subscribe((list: any[]) =>
            {
                list.forEach(rulesData => 
                {
                    if (rulesData.ORDER_FROM <= parseInt(distance) && rulesData.ORDER_TO >= parseInt(distance)) 
                    {
                        if (rulesData.ORDER_CONDITION == "<=") 
                        {
                            if (cartTotalPrice <= rulesData.CONDITION_AMOUNT) 
                            {
                                resolve(rulesData);
                            }
                        }
                        if (rulesData.ORDER_CONDITION == ">") 
                        {
                            if (cartTotalPrice > rulesData.CONDITION_AMOUNT) 
                            {
                                resolve(rulesData);
                            }
                        }
                    }
                })
            })
        })
    }
    

}