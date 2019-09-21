/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class ADD_ORDER_MST
{
    key: any;
    RESTAURENT_ID: any;
    GEOHASH: any;
    DELIVERY_ADDRESS: any[] = [];
    SELECT_ADDRESS: any;
    SELECT_ADDRESS_GEOHASH: string;
    SELECT_ADDRESS_GEOPOINT_LATITUDE: number;
    SELECT_ADDRESS_GEOPOINT_LONGITUDE: number;
    ORDER_ID: string;
    PAYMENT_TYPE: any;
    ORDER_STATUS: string;
    HAWKER_STATUS: any;
    MENUCART: any[] = [];
    DEFAUNT: boolean;
    CR_DT: Date;
    SAVE_DT: Date;
    ORG_ID: any;
    RESTRO_USER_ID: any;
    RESTRO_USER_CART_TOTAL: number;
    RESTRO_USER_CART_DISCOUNT_TOTAL: number;
    RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT: number;
    RESTRO_USER_CART_COUPON_DISCOUNT_TYPE: any;
    RESTRO_USER_CART_COUPON_DISCOUNT_NAME: any;
    CURRENT_MONTH: number;
    RESTRO_USER_CART_CHARGES: number;
    RESTRO_USER_CART_CURRENCY: any;
    DELIVERD: boolean = false;
    ORDER_STATUS_ARRAY: any[] = [];
    RESTRO_USER_OTP: any;
    CART_OVER_TOTAL: any;
    HAWKER_KEY: any;
}

export class FIRE_ADD_ORDER_MST_REF
{
    static ORDER_MST = "ORDER_MST"
}
