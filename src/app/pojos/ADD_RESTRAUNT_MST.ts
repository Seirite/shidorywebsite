/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class ADD_RESTAURANT_MST
{
    key: any;
    RESTRO_COUNTRY_NAME: string;
    RESTRO_COUNTRY_ID: any;
    RESTRO_TIMEZONE_ID: any;
    RESTRO_STATE_NAME: string;
    RESTRO_CITY_NAME: string;
    RESTRO_NAME: string;
    RESTRO_ADDRESS: string;
    RESTRO_AREA_NAME: string;
    RESTRO_BRANCH_ADDRESS: string;
    RESTRO_ADDRESS_lat: number;
    RESTRO_ADDRESS_lng: number;
    RESTRO_OWNER_NAME: string;
    RESTRO_FOOD_LICENSE_NO: number;
    RESTRO_GST_NO: number;
    RESTRO_LOCATION: {geohash?: string, geopoint?: any} = {};;
    RESTRO_AADHAR_NO: number;
    RESTRO_PHONE_CODE: string;
    RESTRO_COMISION: number;
    RESTRO_PHONE_NO: string;
    RESTRO_MOBILE_NO: string;
    RESTRO_IMAGE: string;
    RESTRO_TYPE: string;
    RESTRO_DELIVERY_TIME: string;
    RESTRO_EMAIL_ID: string;
    RESTRO_PASSWORD: string;
    RESTRO_ISAPROVAL: boolean = false;
    RESTRO_ISLOGIN: boolean = false;
    DEFAUNT: boolean = false;
    CR_DT: Date;
    SAVE_DT: Date;
    ORG_ID: any;
    ACCOUNT_NO: string;
    IFSC_CODE: string;
    BANK_NAME: string;
    OPENING_TIME: string;
    CLOSING_TIME: string;
    RESTRO_USER_DISTANCE: string;
    RESTRO_RATING_ONE: number = 0;
    RESTRO_RATING_TWO: number = 0;
    RESTRO_RATING_THREE: number = 0;
    RESTRO_RATING_FOUR: number = 0;
    RESTRO_RATING_FIVE: number = 0;
}

export class FIRE_ADD_RESTAURANT_MST_REF
{
    static RESTAURANT_MST = "RESTAURANT_MST"
}
