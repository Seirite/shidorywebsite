
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class PACKAGE_MST{
    ORG_ID:string;
    OPR_ID:string;
    CR_DT:any;
    DEFUNCT:boolean;
    PKG_TITLE:string;  
    PKG_START_CITY:string;
    PKG_START_COUNTRY:string;
    PKG_DEST_COVERED:string[];
    PKG_DEST_COUNTRY:string;
    PKG_DAYS:string;
    PKG_FOOD_PLAN:string;
    PKG_SERVICES:string[];
    PKG_OTHERS:string;
    PKG_DAY_WISE_DATA:DAY_WISE_PLAN[];
    PKG_CATEGORY:string;
    PKG_CAT_DESC:string;
    PKG_AMT:number;
    PKG_IMAGES_PATH:string[];
    PKG_ADVANCE_AMT_PER:number;
    PKG_ADVANCE_AMT_DESC:string;
    PKG_CANCELATION_DESC:string;
    PKG_OTHER_CONDITION_DESC:string;
    PKG_TAG_THEME:string[];
    
    
    
     
}



 export class  DAY_WISE_PLAN{
    
    PLAN_DAY:string;
    PLAN_DESC:string;
    PLAN_HOTEL_CITY:string;
    PLAN_HOTEL_NAME:string;
    PLAN_HOTEL_RANK:string;
    
} 

export class Upload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;

  constructor(file:File) {
    this.file = file;
  }
}