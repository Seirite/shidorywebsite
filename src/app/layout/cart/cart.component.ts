import { Component, OnInit, ViewChild } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import { NavigationExtras, Router} from '@angular/router';
import {CartProvider} from './cart.provider';
import {AuthService} from '../../utility/auth-service';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import Geohash = require('latlon-geohash');
import GeohashDistance = require('geohash-distance');
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';
import {DeliveryAddressComponent} from '../delivery-address/delivery-address.component';
import {MatDialog, MatSnackBar, MatBottomSheet} from '@angular/material';
import {AlertDialogComponent} from '../alert-dialog/alert-dialog.component';
import {ApplyCouponComponent} from '../apply-coupon/apply-coupon.component';
import {LoginComponent} from '../login/login.component';
import {OtpDialogComponent} from '../otp-dialog/otp-dialog.component';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {WindowRef} from '../Razorpay/windowRef.service';

export interface DialogData {
  geohash: string;
  selectAddress: string;
  RESTAURENT_ID: string;
  ORDER_ID: string;
  restaurantObj: ADD_RESTAURANT_MST;
  windowRef: any;
  error : any;
  menuKey : any;
  restaurantKey : any;
    showLoginIterface: string;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    otherCharges: number = 0;
    paymentDone: boolean = false;
    showRazorPayCardForm: boolean = false;
    selectAddress: string;
    showCashCardForm: boolean = true;
    coupunDiscountName: any = 0;
    coupunDiscountAmount: number = 0;
    coupunDiscountType: number = 0;
    wrongCoupan: boolean = false;
    cartDiscountPrice: number = 0;
    userAppliedCoupun: any;
    showMessage: boolean = false;
    restroObj: ADD_RESTAURANT_MST;
    cartOverAllTotalPrice: number = 0;
    cartLength: number;
    loadering: boolean;
    userGeohash: any;
    component: any;
    dataCharges: number = 0;
    @ViewChild("placesRef", {static: true}) placesRef : GooglePlaceDirective;
    userLocation: {lat: number; lng: number;};
    loader: boolean = false;
    cityName: any;
    stateName: any;
    countryName: any;
    cartPriceCurrency: any;
    showCountinue: boolean = false;
//    showShopingCart: boolean = true;
    showPaymentMethod: boolean = false;
    deliveryAddressArray: any[] = [];
    entOrderMst: ADD_ORDER_MST;
    showShopingInfo: boolean = true;
    loginUserEmail: string;
    loginDone: string;
    loginUserImage: string;
    loginUserName: string;
    cartTotalPrice: any = 0;
    cartMenuItemList: any[] = [];
    loading: boolean = false;
    selectRestaurantKey: any;
    options={
    types: [],
    componentRestrictions: { country: 'IN' }
    }
    constructor(private util:SiUtil, public auth: AuthService, public router: Router, public provider: CartProvider, public dialog: MatDialog, private snackBar: MatSnackBar, private bottomSheet: MatBottomSheet, private http:  HttpClient, private winRef: WindowRef) {}

    async ngOnInit() {
        this.entOrderMst = new ADD_ORDER_MST();
        this.restroObj = new ADD_RESTAURANT_MST();
        this.loading = true;
        this.selectRestaurantKey = localStorage.getItem("selectRestaurantKey");
        if (typeof this.selectRestaurantKey == "undefined")
        {
            this.router.navigate(['/error']);
        }
        else
        {
            var list = JSON.parse(localStorage.getItem("menuItemArray"));
            this.cartMenuItemList = list;
            if (this.cartMenuItemList == null || this.cartMenuItemList.length == 0)
            {
                var cartLength = 0;
                localStorage.setItem("cartLength", cartLength.toString());
                this.cartLength = parseInt(localStorage.getItem("cartLength"));
            }
            if (list != null) 
            {
                list.forEach(data => 
                {
                    if (localStorage.getItem("restroKey") != data.RESTAURENT_ID) 
                    {
                        this.loading = false;
                        this.openAlert();
                    }
                    this.calculateItemPrice();
                    this.cartPriceCurrency = data.MENU_ITEM_CURRENCY;
                })
            }
        }
        this.loading = false
        await this.getLoginUserData();
        await this.checkForDeliveryAddress();
        await this.getUserLocation();
        await this.getRestroData();
        await this.checkout();
    }
    
    getLoginUserData()
    {
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        if (list)
        {
            this.loginDone = localStorage.getItem("isLoggedin");
            if (this.loginDone != null) 
            {
                this.loginUserName = this.auth.getSession().displayName;
                this.loginUserImage = this.auth.getSession().photoURL;
                this.loginUserEmail = this.auth.getSession().email;
            }
            if (this.loginDone == null) 
            {
                this.openLoginDialog('login');
            }
        }
        else
        {
            this.loginDone = localStorage.getItem("isLoggedin");
            this.loginUserName = this.auth.getSession().displayName;
            this.loginUserImage = this.auth.getSession().photoURL;
            this.loginUserEmail = this.auth.getSession().email;
        }
    }
    
    checkForDeliveryAddress()
    {
        if (this.auth.getSession() != null)
        {
            this.provider.getRestroUserData(this.auth.getSession().uid).then((data: ADD_ORDER_MST) =>
            {
                if (data.DELIVERY_ADDRESS)
                {
                    if (data.DELIVERY_ADDRESS.length !== 0) 
                    {
                        this.deliveryAddressArray = data.DELIVERY_ADDRESS;
                    }
                }
            }).catch(error => 
            {
                console.log(error);
            })
        }
    }
    
    addQuantity(Obj)
    {
        Obj.MENU_ITEM_QUANTITY = Obj.MENU_ITEM_QUANTITY + 1;
        if(Obj.MENU_ITEM_QUANTITY == 1)
        {
            Obj.MENU_ITEM_TOTAL = Obj.MENU_ITEM_PRICE;
            this.calculateItemPrice();
        }
        else
        {
            Obj.MENU_ITEM_TOTAL = Obj.MENU_ITEM_PRICE * Obj.MENU_ITEM_QUANTITY;
            this.calculateItemPrice();
        }
    }
    
    removeQuantity(Obj)
    {
        if(Obj.MENU_ITEM_QUANTITY == 1)
        {
            this.cartTotalPrice = Obj.MENU_ITEM_PRICE;
            this.removeItem(Obj);
        }
        else
        {
            Obj.MENU_ITEM_QUANTITY = Obj.MENU_ITEM_QUANTITY - 1;
            Obj.MENU_ITEM_TOTAL = Obj.MENU_ITEM_PRICE * Obj.MENU_ITEM_QUANTITY;
            this.calculateItemPrice();
        }
    }
    
    calculateItemPrice()
    {
        if (this.cartMenuItemList.length !== 0)
        {
            this.cartTotalPrice = 0;
            this.cartMenuItemList.forEach(data =>
            {
                if (data.MENU_ITEM_QUANTITY > 1) 
                {
                    data.MENU_ITEM_TOTAL = data.MENU_ITEM_PRICE * data.MENU_ITEM_QUANTITY;
                    this.cartTotalPrice += parseInt(data.MENU_ITEM_TOTAL);
                    localStorage.setItem("cartTotalPrice", this.cartTotalPrice.toString())
                    this.cartTotalPrice = parseInt(localStorage.getItem("cartTotalPrice"));
                }
                else 
                {
                    this.cartTotalPrice += parseInt(data.MENU_ITEM_PRICE);
                    localStorage.setItem("cartTotalPrice", this.cartTotalPrice.toString())
                    this.cartTotalPrice = parseInt(localStorage.getItem("cartTotalPrice"));
                }
            });
            localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList));
            localStorage.setItem("cartLength", this.cartMenuItemList.length.toString());
            this.cartLength = parseInt(localStorage.getItem("cartLength"));
        }
        if (this.cartMenuItemList.length == 0)
        {
            this.cartTotalPrice = 0;
            localStorage.setItem("cartTotalPrice", this.cartTotalPrice.toString())
            this.cartTotalPrice = parseInt(localStorage.getItem("cartTotalPrice"));
            localStorage.setItem("cartLength", this.cartMenuItemList.length.toString());
            this.cartLength = parseInt(localStorage.getItem("cartLength"));
        }
    }
    
    showPayTm()
    {
        this.showCashCardForm = false;
        this.entOrderMst.PAYMENT_TYPE = "CARD";
//        let url = `https://us-central1-shidory-c2c4c.cloudfunctions.net/PayTmTransaction`
//        let httpOptions = {
//            headers: new HttpHeaders({
//                'Content-Type': 'application/json',
//            })
//        };
//        let body = {
//            "Info":
//                {
//                    "url": "/callback",
//                }
//        };
//        return this.http.post(url, body, httpOptions)
//            .toPromise()
//            .then(res => 
//            {
//                console.log(res);
//            })
//            .catch(err => 
//            {
//                console.log(err);
//            })
    }
    
    showCashCard()
    {
        this.showCashCardForm = true;
        this.showRazorPayCardForm = false;
        this.entOrderMst.PAYMENT_TYPE = "COD";
    }
    
    showRazorpayCard()
    {
        this.showCashCardForm = false;
        this.showRazorPayCardForm = true;
        this.entOrderMst.PAYMENT_TYPE = "CARD";
        this.callRazorpay();
    }
    
    countinueOrder()
    {
        this.router.navigate(['/shop']);
    }
    
    removeItem(Obj)
    {
        var index = this.cartMenuItemList.indexOf(Obj);
        if (index > -1) 
        {
            this.cartMenuItemList.splice(index, 1);
            localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList))
            this.calculateItemPrice();
        }
    }
    
    public async handleAddressChange(address: Address) 
    {
        address.address_components.forEach(data =>
        {
            if (data.types[0] === "country")
            {
                this.countryName = data.long_name.trim().toUpperCase();
            }
            if (data.types[0] === "administrative_area_level_1") 
            {
                this.stateName = data.long_name.trim().toUpperCase();
            }
            if (data.types[0] === "locality" || data.types[0] === "administrative_area_level_2")
            {
                this.cityName = data.long_name.trim().toUpperCase();
            }
        })
        this.userLocation = {
            lat : address.geometry.viewport.getCenter().lat(),
            lng : address.geometry.viewport.getCenter().lng()
        }
        this.userGeohash = Geohash.encode(this.userLocation.lat, this.userLocation.lng, 12);
        this.selectAddress = address.formatted_address;
        this.checkForDeliveryAddressLength();
    }
    
    checkForDeliveryAddressLength()
    {
        if (this.auth.getSession() != null)
        {
            this.provider.getRestroUserData(this.auth.getSession().uid).then((data: ADD_ORDER_MST) =>
            {
                if (typeof data.DELIVERY_ADDRESS == "undefined" || data.DELIVERY_ADDRESS.length < 4) 
                {
                    this.addNewAddress();
                }
                else 
                {
                    var message = "Sorry, you can not add deliver location first delete one.";
                    var action = " ";
                    this.openSnackBarAddress(message, action);
                }
            }).catch(error => 
            {
                var message = "Please check your internet setting";
                var action = "";
                this.openSnackBar(message, action);
            })
        }
    }
    
    addNewAddress()
    {
        let dialogBoxSettings = {
            width: '450px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
            data: {geohash: this.userGeohash, RESTAURENT_ID: this.selectRestaurantKey, selectAddress: this.selectAddress}
        };
        this.component = DeliveryAddressComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result => {
            this.showCountinue = false;
            this.showMessage = false;
            this.checkForDeliveryAddress();
        });
    }
    
    openSnackBarAddress(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }
    
    
    checkout()
    {
        var date = new Date();
        var order_id = localStorage.getItem("callingCode") + date.getTime();
        this.entOrderMst.RESTAURENT_ID = this.selectRestaurantKey;
        this.entOrderMst.ORDER_ID = order_id;
        this.entOrderMst.PAYMENT_TYPE = "COD";
        this.entOrderMst.ORDER_STATUS = "PENDING";
        this.entOrderMst.MENUCART = this.cartMenuItemList;
    }
    
    countinueToOrder()
    {
        if (typeof this.entOrderMst.SELECT_ADDRESS == "undefined")
        {
            
        }
        else
        {
            this.callRazorpay();
//            this.showShopingInfo = false;
//            this.showPaymentMethod = true;
        }
        
    }
    
    logOut()
    {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
        localStorage.clear();
        this.router.navigate(['/home']);
    }
    
    onSelectAddress(Obj)
    {
        if (Obj.buldingNo)
        {
            this.entOrderMst.SELECT_ADDRESS = Obj.buldingNo + ", " + Obj.address + ", " + Obj.neighborhood + ", " + Obj.selectAddress + ", " + Obj.zipcode;
        }
        else
        {
            this.entOrderMst.SELECT_ADDRESS = Obj.selectAddress;
        }
        this.loadering = true;
        this.cartOverAllTotalPrice = this.cartTotalPrice;
        this.entOrderMst.SELECT_ADDRESS_GEOHASH = Obj.geohash;
        var latlng = Geohash.decode(Obj.geohash);
        this.entOrderMst.SELECT_ADDRESS_GEOPOINT_LATITUDE = latlng.lat;
        this.entOrderMst.SELECT_ADDRESS_GEOPOINT_LONGITUDE = latlng.lon;
        this.provider.getRestroData(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).then(async (restroData: ADD_RESTAURANT_MST) =>
        {
            console.log(restroData);
            var distance = GeohashDistance.inKm(Obj.geohash, restroData.RESTRO_LOCATION.geohash.substring(0,6));
            var countryData: any = await this.provider.getOrderDistance(this.countryName);
            var totalDistanceAmount = (parseInt(distance) + 1) * countryData.OPR_ORD_PRICE;
            var orderDeliveredAmount = countryData.OPR_ORD_DELIVERD_PRICE + countryData.OPR_ORD_TAKEN_PRICE;
            this.entOrderMst.HAWKER_TOTAL_AMOUNT = orderDeliveredAmount + totalDistanceAmount;
            if (countryData.OPR_ORD_RANGE_DISTANCE)
            {
                if (countryData.OPR_ORD_RANGE_DISTANCE >= distance)
                {
                    var rulesData: any = await this.provider.checkApplyRules(this.countryName, distance, this.cartTotalPrice);
                    var taxAmount = 0;
                    var packingAmount = 0;
                    if(countryData.OPR_TAXS)
                    {
                        taxAmount = countryData.OPR_TAXS;
                    }
                    if(countryData.OPR_PACKING)
                    {
                        packingAmount = countryData.OPR_PACKING;
                    }
                    if (rulesData == "NFD") 
                    {
                        this.dataCharges = 0;
                        var cartTotalAmount = this.cartTotalPrice + 0;
                        var taxsCalculation = cartTotalAmount * (taxAmount / 100);
                        var packingCalculation = this.cartTotalPrice * (packingAmount / 100);
                        if (packingCalculation < 10)
                        {
                            packingCalculation = 10;
                        }
                        if (packingCalculation > 50)
                        {
                            packingCalculation = 50;
                        }
                        this.otherCharges = parseInt(taxsCalculation.toFixed()) + parseInt(packingCalculation.toFixed());
                        this.cartOverAllTotalPrice = cartTotalAmount + this.otherCharges;
                        this.loadering = false;
                        this.showCountinue = true;
                    }
                    else 
                    {
                        this.dataCharges = rulesData.CHARGES;
                        var cartTotalAmount = this.cartTotalPrice + rulesData.CHARGES;
                        var taxsCalculation = cartTotalAmount * (taxAmount / 100);
                        var packingCalculation = this.cartTotalPrice * (packingAmount / 100);
                        if (packingCalculation < 10)
                        {
                            packingCalculation = 10;
                        }
                        if (packingCalculation > 50)
                        {
                            packingCalculation = 50;
                        }
                        this.otherCharges = parseInt(taxsCalculation.toFixed()) + parseInt(packingCalculation.toFixed());
                        this.cartOverAllTotalPrice = cartTotalAmount + this.otherCharges;
                        this.loadering = false;
                        this.showCountinue = true;
                    }
                }
                else 
                {
                    var message = "Sorry, this restaurant does not deliver to your selected location.";
                    var action = " ";
                    this.showMessage = true;
                    this.openSnackBar(message, action);
                    this.loadering = false;
                    this.showCountinue = false;
                    this.userAppliedCoupun = "";
                }
            }
            else
            {
                if (5 >= distance)
                {
                    var rulesData: any = await this.provider.checkApplyRules(this.countryName, distance, this.cartTotalPrice);
                    if (rulesData == "NFD") 
                    {
                        this.dataCharges = 0;
                        var cartTotalAmount = this.cartTotalPrice + 0;
                        var taxsCalculation = cartTotalAmount * (taxAmount / 100);
                        var packingCalculation = this.cartTotalPrice * (packingAmount / 100);
                        if (packingCalculation < 10)
                        {
                            packingCalculation = 10;
                        }
                        if (packingCalculation > 50)
                        {
                            packingCalculation = 50;
                        }
                        this.otherCharges = parseInt(taxsCalculation.toFixed()) + parseInt(packingCalculation.toFixed());
                        this.cartOverAllTotalPrice = cartTotalAmount + this.otherCharges;
                        this.loadering = false;
                        this.showCountinue = true;
                    }
                    else 
                    {
                        this.dataCharges = rulesData.CHARGES;
                        var cartTotalAmount = this.cartTotalPrice + rulesData.CHARGES;
                        var taxsCalculation = cartTotalAmount * (taxAmount / 100);
                        var packingCalculation = this.cartTotalPrice * (packingAmount / 100);
                        if (packingCalculation < 10)
                        {
                            packingCalculation = 10;
                        }
                        if (packingCalculation > 50)
                        {
                            packingCalculation = 50;
                        }
                        this.otherCharges = parseInt(taxsCalculation.toFixed()) + parseInt(packingCalculation.toFixed());
                        this.cartOverAllTotalPrice = cartTotalAmount + this.otherCharges;
                        this.loadering = false;
                        this.showCountinue = true;
                    }
                }
                else 
                {
                    var message = "Sorry, this restaurant does not deliver to your selected location.";
                    var action = " ";
                    this.showMessage = true;
                    this.openSnackBar(message, action);
                    this.loadering = false;
                    this.showCountinue = false;
                    this.userAppliedCoupun = "";
                }
            }
            
        }).catch(error =>
        {
            var message = "Sorry, this restaurant does not deliver to your selected location.";
            var action = " ";
            this.showMessage = true;
            this.openSnackBar(message, action);
            this.loadering = false;
            this.showCountinue = false;
            this.userAppliedCoupun = "";
        })
    }
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 1000
        });
    }
    
    deleteAddressFromArray(Obj)
    {
        var index = this.deliveryAddressArray.indexOf(Obj);
        if (index > -1) 
        {
            this.deliveryAddressArray.splice(index, 1);
            this.provider.getRestroUserData(this.auth.getSession().uid).then((entOrderMst: ADD_ORDER_MST) =>
            {
                entOrderMst.DELIVERY_ADDRESS = this.deliveryAddressArray
                this.provider.updateOrderToRestaurant(entOrderMst);
                this.showCountinue = false;
                this.showMessage = false;
            })
        }
    }
    
    async conformOrder()
    {
        var array = [];
        var date = new Date()
        this.loader = true;
        this.entOrderMst.RESTRO_USER_ID = this.auth.getSession().uid;
        this.entOrderMst.RESTRO_USER_CART_TOTAL = this.cartTotalPrice;
        this.entOrderMst.RESTRO_USER_CART_CURRENCY = this.cartPriceCurrency;
        this.entOrderMst.RESTRO_USER_CART_CHARGES = this.dataCharges;
        this.entOrderMst.CURRENT_MONTH = date.getMonth();
        var restroUserData: any = await this.provider.getRestroUserData(this.entOrderMst.RESTRO_USER_ID);
        if (typeof restroUserData.displayName == "undefined") 
        {
            var order = {
                title: "Order By " + restroUserData.fullName,
                Date: new Date()
            }
        }
        else 
        {
            var order = {
                title: "Order By " + restroUserData.displayName,
                Date: new Date()
            }
        }
        array.push(order);
        this.entOrderMst.ORDER_STATUS_ARRAY = array;
        this.entOrderMst.RESTRO_USER_CART_DISCOUNT_TOTAL = this.cartOverAllTotalPrice;
        this.entOrderMst.RESTRO_USER_CART_COUPON_DISCOUNT_AMOUNT = this.cartDiscountPrice;
        this.entOrderMst.RESTRO_USER_CART_COUPON_DISCOUNT_TYPE = this.coupunDiscountType;
        this.entOrderMst.RESTRO_USER_CART_COUPON_DISCOUNT_NAME = this.coupunDiscountName;
        this.entOrderMst.CART_OVER_TOTAL = this.cartPriceCurrency + " " + this.cartOverAllTotalPrice;
        this.entOrderMst.EXTRACHARGES = this.otherCharges;
        await this.provider.sendOrderToUserSide(this.entOrderMst, this.selectRestaurantKey);
        this.provider.sendOrderToZone(this.entOrderMst, this.restroObj.RESTRO_LOCATION.geohash.substring(0, 5).trim(), this.countryName, this.stateName, this.cityName).then(async key => 
        {
            this.loader = false;
            localStorage.removeItem("menuItemArray");
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "property_id": key
                }
            };
            await this.router.navigate(['/order-conform'], navigationExtras);
        })
    }
    
    async conformPaymentMethod()
    {
        if (this.entOrderMst.PAYMENT_TYPE == "COD")
        {
            this.conformOrder();
        }
        else
        {
            if (this.paymentDone)
            {
//                this.conformOrder();
            }
            else
            {
                this.util.toastInfo("Do Payment", "");
            }
        }
    }
    
    getUserLocation()
    {
        return this.provider.getUserLocation().then((list: any) =>
        {
            list.results.forEach((data: Address) => 
            {
                if (data.types[0] === "country") 
                {
                    this.countryName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "administrative_area_level_1") 
                {
                    this.stateName = data.address_components[0].long_name.trim().toUpperCase();
                }
                if (data.types[0] === "locality" || data.types[0] === "administrative_area_level_2") 
                {
                    this.cityName = data.address_components[0].long_name.trim().toUpperCase();
                }
            })
        }).catch(error =>
        {
            var message = "Please check your internet setting";
            var action = "";
            this.openSnackBarAddress(message, action);
        })
    }
    
    getRestroData()
    {
        if (this.countryName)
        {
            this.provider.getRestroData(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).then((restroObj: ADD_RESTAURANT_MST) =>
            {
                this.restroObj = restroObj;
            }).catch(error =>
            {
                console.log(error);
            })
        }
    }
    
    openAlert()
    {
        const bottomSheetRef = this.bottomSheet.open(AlertDialogComponent);
        bottomSheetRef.afterDismissed().subscribe((data) => 
        {
            var list = JSON.parse(localStorage.getItem("menuItemArray"));
            this.cartMenuItemList = list;
            if (data == "Y")
            {
                if (this.cartMenuItemList == null) 
                {
                    var cartLength = 0;
                    localStorage.setItem("cartLength", cartLength.toString());
                    this.cartLength = parseInt(localStorage.getItem("cartLength"));
                    this.router.navigate(['/home']);
                }
            }
            else
            {
                if (list != null) 
                {
                    list.forEach(data => 
                    {
                        if (localStorage.getItem("restroKey") != data.RESTAURENT_ID) 
                        {
                            this.removeItem(data);
                        }
                    })
                }
            }
        });
    }
    
    applyCoupun()
    {
        let dialogBoxSettings = {
            width: '450px',
            height: '90vh',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto'
        };
        this.component = ApplyCouponComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result => 
        {
            if (result)
            {
                this.getApplyCoupun(result);
            }
        });
    }
    
    async getApplyCoupun(result)
    {
        if (result != null)
        {
            var restroUserAppliedCoupunCount = await this.provider.getRestroUserAppliedCoupun(this.auth.getSession().uid, result.key);
            this.provider.getApplyCoupunOffer(this.countryName, this.stateName, this.cityName, result, this.cartTotalPrice, restroUserAppliedCoupunCount).then((orderDiscountValue: number) =>
            {
                this.cartDiscountPrice = orderDiscountValue;
                this.cartOverAllTotalPrice = this.cartOverAllTotalPrice - orderDiscountValue;
                this.userAppliedCoupun = result;
                this.coupunDiscountName = result.key;
                this.coupunDiscountType = result.DISCOUNT_TYPE;
                this.coupunDiscountAmount = result.DISCOUNT;
                this.wrongCoupan = false;
            }).catch(error =>
            {
                this.wrongCoupan = true;
                if (this.cartLength == 0)
                {
                    this.cancleApplyCoupun();
                }
                else
                {
                    var message = "You cant use this coupun.";
                    var action = "";
                    this.openSnackBarAddress(message, action);
                    this.cancleApplyCoupun();
                }
            })
        }        
    }
    
    async cancleApplyCoupun()
    {
        this.coupunDiscountAmount = 0;
        this.coupunDiscountType = 0;
        this.coupunDiscountName = 0;
        this.userAppliedCoupun = 0;
        await this.calculateItemPrice();
        if (this.dataCharges)
        {
            this.cartOverAllTotalPrice = this.cartTotalPrice + this.dataCharges;
        }
        if (this.otherCharges)
        {
            this.cartOverAllTotalPrice = this.cartOverAllTotalPrice + this.otherCharges;
        }
    }
    
    openLoginDialog(loginUIStatus)
    {
        let dialogBoxSettings = {
            height: '400px',
            width: '480px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
            data: {showLoginIterface: loginUIStatus}
        };
        this.component = LoginComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            this.router.navigate(['/home']);
        })
    }
    
    openOTPDialog()
    {
        let dialogBoxSettings = {
            height: '360px',
            width: '350px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = OtpDialogComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            this.showShopingInfo = false;
            this.showPaymentMethod = true;
        })
    }
    
    callRazorpay()
    {
        if (this.auth.getSession() != null)
        {
            this.provider.getRestroUserData(this.auth.getSession().uid).then((data: any) =>
            {
                let options: any = {
                    "key": "rzp_live_K8k4rXi5uuCIKi", //live key of reser pay
//                    "key": "rzp_test_pjVKOOYNkFn3Bu", //demo key of reser pay
                    "amount": this.cartOverAllTotalPrice * 100,
                    "payment_capture": '1',
                    "name": "Shidory",
                    "description": "E-marketplace pvt ltd",
                    "image": "assets/images/logo/logo-icon.png",
                    "modal": {
                        "escape": false
                    },
                    "prefill": {
                        "name": data.fullName,
                        "contact": data.phoneNumber,
                        "email": data.emailId,
                    },
                    "theme": {
                        "color": "#e6816a"
                    }
                };
                
                options.handler = ((response) => 
                {
                    console.log(response);
                    this.paymentDone = true;
                    this.conformOrder();
                });
                options.modal.ondismiss = (() => 
                {
                    this.paymentDone = false;
                });
                
                let rzp = new this.winRef.nativeWindow.Razorpay(options);
                rzp.open();
            }).catch(error => 
            {
            })
        }
        
    }
    
    onRightClick($event)
    {
//        return false;
    }
    
    keyboardEvent($event)
    {
        if ($event.keyCode == 123) 
        {
            return false;
        }
        else if(($event.ctrlKey && $event.shiftKey && $event.keyCode == 73) || ($event.ctrlKey && $event.shiftKey && $event.keyCode == 74))
        {
            return false;
        }
    }
    
    
}
