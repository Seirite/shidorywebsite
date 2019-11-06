import { Component, OnInit, ViewChild } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import { Router} from '@angular/router';
import {ShopProvider} from './shop.provider';
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';
import {MatTableDataSource, MatPaginator, MatBottomSheet, MatSnackBar, MatDialog} from '@angular/material';
import {AuthService} from '../../utility/auth-service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {AlertDialogComponent} from '../alert-dialog/alert-dialog.component';
import {ADD_ORDER_MST} from '../../pojos/ADD_ORDER_MST';
import {LoginComponent} from '../login/login.component';
import {CustomisableDialogComponent} from '../customisable-dialog/customisable-dialog.component';
import {MobileNoDialogComponent} from '../mobile-no-dialog/mobile-no-dialog.component';
import {RatingViewComponent} from '../rating-view/rating-view.component';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    searchFail: boolean = false;
    checkoutStatus: boolean = false;
    maxRatingValue: number = 0;
    restroRatingValue: any = 0;
    component: any;
    restroStatus: string;
    restroDeliveryTime: string;
    showMainFilter: boolean = false;
    restroAreaName: string;
    restroImage: string;
    cartPriceCurrency: any;
    cartTotalPrice: number = 0;
    cartMenuItemList: any[] = new Array();
    cartLength: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    userCurrency: any;
    cityName: string;
    stateName: string;
    countryName: string;
    loginUserEmail: any;
    loginUserImage: any;
    loginUserName: any;
    loginDone: string;
    selectCategoryKey: any;
    showRelatedList: any;
    showRelated: boolean = false;
    searchValue: any;
    dataSource: MatTableDataSource<{}>;
    menuItemList: any;
    loading: boolean = false;
    menuCategoryList: any[] = [];
    restroName: string;
    selectRestaurantKey: any;
    entOrderMst: ADD_ORDER_MST;
    mainCategoryList: any[] = ["Veg ", "NonVeg "];
    constructor(private util:SiUtil, public router: Router, public auth: AuthService, public provider: ShopProvider, private bottomSheet: MatBottomSheet, private snackBar: MatSnackBar, public dialog: MatDialog) {}

    async ngOnInit() {
        this.loading = true;
        var menuCategoryArray = [];
        const map = new Map();
        this.entOrderMst = new ADD_ORDER_MST();
        this.selectRestaurantKey = localStorage.getItem("selectRestaurantKey");
        this.searchValue = localStorage.getItem("search");
        this.cartLength = parseInt(localStorage.getItem("cartLength"));
        await this.getUserCartList();
        await this.getUserLocation();
        await this.getUserCurreancy();
        await this.getRestroData();
        if (this.searchValue != "undefined") 
        {
//            this.getRestroWiseSearchMenuItem(menuCategoryArray, map)
        }
        else 
        {
            this.getRestroWiseMenuItem(menuCategoryArray, map);
        }
        this.getLoginUserData();
    }
    
    async getRestroData()
    {
        await this.provider.getRestroData(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).then((restroObject: ADD_RESTAURANT_MST) =>
        {
            if (typeof restroObject == "undefined")
            {
                this.router.navigate(['/error']);
            }
            else
            {
                var restroRatingOne = 0;
                var restroRatingTwo = 0;
                var restroRatingThree = 0;
                var restroRatingFour = 0;
                var restroRatingFive = 0;
                if (typeof restroObject.RESTRO_RATING_ONE != "undefined")
                {
                    restroRatingOne = restroObject.RESTRO_RATING_ONE;
                }
                if (typeof restroObject.RESTRO_RATING_TWO != "undefined")
                {
                    restroRatingTwo = restroObject.RESTRO_RATING_TWO;
                }
                if (typeof restroObject.RESTRO_RATING_THREE != "undefined")
                {
                    restroRatingThree = restroObject.RESTRO_RATING_THREE;
                }
                if (typeof restroObject.RESTRO_RATING_FOUR != "undefined")
                {
                    restroRatingFour = restroObject.RESTRO_RATING_FOUR;
                }
                if (typeof restroObject.RESTRO_RATING_FIVE != "undefined")
                {
                    restroRatingFive = restroObject.RESTRO_RATING_FIVE;
                }
                this.maxRatingValue = Math.max(restroRatingOne, restroRatingTwo, restroRatingThree, restroRatingFour, restroRatingFive);
                if (isNaN(this.maxRatingValue))
                {
                    this.maxRatingValue = 0;
                }
                if (this.maxRatingValue == 0)
                {
                    this.restroRatingValue = 0;
                }
                else
                {
                    if (this.maxRatingValue == restroObject.RESTRO_RATING_ONE )
                    {
                        this.restroRatingValue = 1;
                    }
                    if (this.maxRatingValue == restroObject.RESTRO_RATING_TWO )
                    {
                        this.restroRatingValue = 2;
                    }
                    if (this.maxRatingValue == restroObject.RESTRO_RATING_THREE )
                    {
                        this.restroRatingValue = 3;
                    }
                    if (this.maxRatingValue == restroObject.RESTRO_RATING_FOUR )
                    {
                        this.restroRatingValue = 4;
                    }
                    if (this.maxRatingValue == restroObject.RESTRO_RATING_FIVE )
                    {
                        this.restroRatingValue = 5;
                    }
                }
                this.restroName = restroObject.RESTRO_NAME;
                this.restroAreaName = restroObject.RESTRO_AREA_NAME;
                if (restroObject.RESTRO_DELIVERY_TIME)
                {
                    this.restroDeliveryTime = restroObject.RESTRO_DELIVERY_TIME;
                }
                else
                {
                    this.restroDeliveryTime = "30";
                }
                if (restroObject.RESTRO_IMAGE)
                {
                    this.restroImage = restroObject.RESTRO_IMAGE;
                }
                else
                {
                    this.restroImage = "https://nrai.org/site/wp-content/uploads/2017/12/chinese-buffet-near-me.jpg";
                }
                this.provider.serviceFirestore.getTimeUsingTimezone().then((date: String) =>
                {
                    var currentHours = date.split(' ')[4].split(':')[0];
                    var currentMinites = date.split(' ')[4].split(':')[1];
                    var restroClosingTime = restroObject.CLOSING_TIME
                    var restroOpeningTime = restroObject.OPENING_TIME
                    var currentTime = currentHours + ":" + currentMinites;
                    var restroOpeningTimeDiffrence = this.getTimeDiffrence(restroOpeningTime, currentTime);
                    var restroClosingTimeDiffrence = this.getTimeDiffrence(currentTime, restroClosingTime);
                    if (restroOpeningTime < restroClosingTime)
                    {
                        if (restroOpeningTimeDiffrence >= 0 && restroClosingTimeDiffrence >= 0) 
                        {
                            this.restroStatus = "open";
                        }
                        else 
                        {
                            this.restroStatus = "closed";
                        }
                    }
                    else
                    {
                        if (restroOpeningTimeDiffrence < 0)
                        {
                            if (restroOpeningTimeDiffrence <= 0 && restroClosingTimeDiffrence >= 0) 
                            {
                                this.restroStatus = "open";
                            }
                            else 
                            {
                                this.restroStatus = "closed";
                            }
                        }
                        else
                        {
                            if (restroOpeningTimeDiffrence >= 0 && restroClosingTimeDiffrence <= 0) 
                            {
                                this.restroStatus = "open";
                            }
                            else 
                            {
                                this.restroStatus = "closed";
                            }
                        }
                    }
                }).catch(error =>
                {
                    console.log(error);
                })
            }
            if (restroObject.RESTRO_TYPE == "Veg/NonVeg")
            {
                this.showMainFilter = true;
            }
        })
    }
    
    getTimeDiffrence(startDateString: any, endDateString: any)
    {
        var start = startDateString.split(":");
        var end = endDateString.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        // If using time pickers with 24 hours format, add the below line get exact hours
//        if (hours < 0)
//            hours = hours + 24;

//        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
        return hours ;
    }
    
    getTimeInFormate(date)
    {
        var elem = date.split(' ');
        var stSplit = elem[0].split(":");
        var stHour = stSplit[0];
        var stMin = stSplit[1];
        var stAmPm = elem[1].toUpperCase();
        if (stAmPm == 'PM') 
        {
            if (stHour != 12) 
            {
                stHour = stHour * 1 + 12;
            }
        } 
        else if (stAmPm == 'AM' && stHour == '12') 
        {
            stHour = stHour - 12;
        } 
        else 
        {
            stHour = stHour;
        }
        return stHour + ':' + stMin;
    }
    
    addQuantity(Obj)
    {
        Obj.MENU_ITEM_QUANTITY = parseInt(Obj.MENU_ITEM_QUANTITY) + 1;
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
            Obj.MENU_ITEM_QUANTITY = parseInt(Obj.MENU_ITEM_QUANTITY) - 1;
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
                    data.MENU_ITEM_TOTAL = data.MENU_ITEM_PRICE * data.MENU_ITEM_QUANTITY;
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
    
    removeItem(Obj)
    {
        var index = this.cartMenuItemList.indexOf(Obj);
        if (index > -1) 
        {
            this.cartMenuItemList.splice(index, 1);
            localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList));
            this.calculateItemPrice();
        }
    }
    
    getUserCartList()
    {
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        this.cartMenuItemList = list;
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
    
    getCheckoutStatus()
    {
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        this.cartMenuItemList = list;
        if (list != null) 
        {
            list.forEach(data => 
            {
                if (this.selectRestaurantKey != data.RESTAURENT_ID) 
                {
                    this.checkoutStatus = true;
                    this.openAlert();
                }
            })
        }
    }
    
    async checkout()
    {
        await this.getCheckoutStatus();
        if (!this.checkoutStatus)
        {
            if (this.restroStatus == "open")
            {
                var date = new Date();
                var order_id = localStorage.getItem("callingCode") + date.getTime();
                this.entOrderMst.RESTAURENT_ID = this.selectRestaurantKey;
                this.entOrderMst.ORDER_ID = order_id;
                this.entOrderMst.PAYMENT_TYPE = "CARD";
                this.entOrderMst.ORDER_STATUS = "PENDING";
                this.entOrderMst.MENUCART = this.cartMenuItemList;
                if (this.loginDone == null) 
                {
                    this.openLoginDialog();
                }
                else 
                {
                    if (this.loginDone) 
                    {
                        if (this.auth.getSession().uid) 
                        {
                            var restroUserObj: any = await this.provider.getRestroUserObj(this.auth.getSession().uid);
                            if (restroUserObj) 
                            {
                                if (restroUserObj.phoneNumber != "null") 
                                {
                                    if (restroUserObj.phoneNumber) 
                                    {
                                        this.router.navigate(['/cart']);
                                    }
                                    else 
                                    {
                                        this.openMobileNoDialog();
                                    }
                                }
                                else 
                                {
                                    this.openMobileNoDialog();
                                }
                            }
                        }
                    }
                }
            }
            else 
            {
                var message = "Sorry, You cant give order to this restaurant because this restaurant is now closed.";
                var action = " ";
                this.openSnackBar(message, action);
            }
        }
    }
    
    checkUserCart(Obj)
    {
        if (Obj.MENU_ITEM_QUANTITY < 1)
        {
            this.removeItem(Obj);
        }
    }
    
    applyCalculation(quantity, Obj)
    {
        Obj.MENU_ITEM_QUANTITY = Math.abs(quantity);
        if (isNaN(Obj.MENU_ITEM_QUANTITY))
        {
            Obj.MENU_ITEM_QUANTITY = 0;
            this.calculateItemPrice();
        }
        if (quantity < 1)
        {
            var message = "Item Quantity must be positive number.";
            var action = " ";
            this.openSnackBar(message, action);
        }
        if (quantity == "-")
        {
            Obj.MENU_ITEM_QUANTITY = 1;
            this.calculateItemPrice();
        }
        if (!quantity || quantity < 0)
        {
            Obj.MENU_ITEM_QUANTITY = 0;
            this.calculateItemPrice();
        }
        else
        {
            this.calculateItemPrice();
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
            this.openSnackBar(message, action);
        })
    }
    
    getLoginUserData()
    {
        this.loginDone = localStorage.getItem("isLoggedin");
        if (this.loginDone != null)
        {
            this.loginUserName = this.auth.getSession().displayName;
            this.loginUserImage = this.auth.getSession().photoURL;
            this.loginUserEmail = this.auth.getSession().email;
        }
    }
    
    logOut()
    {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
        localStorage.clear();
        this.router.navigate(['/home']);
    }
    
    async getUserCurreancy()
    {
        await this.provider.getUserCurrency(this.countryName).subscribe(list =>
        {
            this.userCurrency = list[0].OPR_CURRENCY_SYMBOL
            localStorage.setItem("callingCode", list[0].OPR_PHONECODE)
        })
    }
    
    checkCartToSingleObject(Obj)
    {
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        for(let i = 0; i <list.length; i++)
        {
            if (list[i].MENU_ITEM_KEY == Obj.MENU_ITEM_KEY)
            {
                return true;
            }
        }
    }
    
    checkCartToCustomizeObject(Obj)
    {
        var list = JSON.parse(localStorage.getItem("menuItemArray"));
        for(let i = 0; i <list.length; i++)
        {
            if (list[i].MENU_ITEM_NAME == Obj.MENU_ITEM_NAME && list[i].MENU_ITEM_KEY == Obj.MENU_ITEM_KEY)
            {
                return true;
            }
        }
    }
    
    addItemCart(Obj)
    {
        if (Obj.MENU_ITEM_HALF_PRICE)
        {
            this.openCustomisableDialog(Obj);
        }
        else
        {
            this.addCart(Obj);
        }
    }
    
    addCart(Obj)
    {
        if (typeof Obj.MENU_ITEM_HALF_PRICE == "undefined")
        {
            Obj.MENU_ITEM_HALF_PRICE = 0;
        }
        Obj.MENU_ITEM_CURRENCY = this.userCurrency;
        var arrayObj = {
            MENU_ITEM_CATEGORY: Obj.MENU_ITEM_CATEGORY.trim(),
            MENU_ITEM_CURRENCY: Obj.MENU_ITEM_CURRENCY,
            MENU_ITEM_INGRADIENTS: Obj.MENU_ITEM_INGRADIENTS,
            MENU_ITEM_NAME: Obj.MENU_ITEM_NAME,
            MENU_ITEM_HALF_PRICE: Obj.MENU_ITEM_HALF_PRICE,
            MENU_ITEM_PRICE: Obj.MENU_ITEM_PRICE,
            MENU_ITEM_QUANTITY: Obj.MENU_ITEM_QUANTITY,
            TODAY_SPECIAL: Obj.TODAY_SPECIAL,
            MENU_ITEM_TOTAL: Obj.MENU_ITEM_TOTAL,
            MENU_ITEM_IMAGE: Obj.MENU_ITEM_IMAGE,
            RESTAURENT_ID: Obj.RESTAURENT_ID,
            MENU_ITEM_KEY: Obj.MENU_ITEM_KEY,
            ORDER_STATUS: "PENDING",
        }
        localStorage.setItem("restroKey", Obj.RESTAURENT_ID);
        if (JSON.parse(localStorage.getItem("menuItemArray")) == null || JSON.parse(localStorage.getItem("menuItemArray")).length == 0)
        {
            if (this.cartMenuItemList == null)
            {
                this.cartMenuItemList = [];
                this.cartMenuItemList.push(arrayObj);
                localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList))
                this.getUserCartList();
            }
            else
            {
                this.cartMenuItemList.push(arrayObj);
                localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList))
                this.getUserCartList();
            }
        }
        else
        {
            var data = this.checkCartToSingleObject(Obj);
            if (data)
            {
                if (Obj.MENU_ITEM_HALF_PRICE != 0)
                {
                    var customizeData = this.checkCartToCustomizeObject(arrayObj);
                    if (customizeData)
                    {
                        this.showUpdatedCustomizeItem(arrayObj);
                    }
                    else
                    {
                        this.cartMenuItemList = JSON.parse(localStorage.getItem("menuItemArray"));
                        this.cartMenuItemList.push(arrayObj);
                        localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList))
                        this.getUserCartList();
                    }
                }
                else
                {
                    this.showUpdatedSingleItem(Obj);
                }
            }
            else
            {
                this.cartMenuItemList = JSON.parse(localStorage.getItem("menuItemArray"));
                this.cartMenuItemList.push(arrayObj);
                localStorage.setItem("menuItemArray", JSON.stringify(this.cartMenuItemList))
                this.getUserCartList();
            }
        }
    }
    
    showUpdatedSingleItem(newItem) 
    {
        let updateItem = this.cartMenuItemList.find(this.findIndexToUpdate, newItem.MENU_ITEM_KEY);
        var arrayObj = {
            MENU_ITEM_CATEGORY: updateItem.MENU_ITEM_CATEGORY.trim(),
            MENU_ITEM_CURRENCY: updateItem.MENU_ITEM_CURRENCY,
            MENU_ITEM_INGRADIENTS: updateItem.MENU_ITEM_INGRADIENTS,
            MENU_ITEM_NAME: updateItem.MENU_ITEM_NAME,
            MENU_ITEM_HALF_PRICE: updateItem.MENU_ITEM_HALF_PRICE,
            MENU_ITEM_PRICE: updateItem.MENU_ITEM_PRICE,
            MENU_ITEM_QUANTITY: updateItem.MENU_ITEM_QUANTITY + 1,
            TODAY_SPECIAL: updateItem.TODAY_SPECIAL,
            MENU_ITEM_TOTAL: updateItem.MENU_ITEM_TOTAL,
            MENU_ITEM_IMAGE: updateItem.MENU_ITEM_IMAGE,
            RESTAURENT_ID: updateItem.RESTAURENT_ID,
            MENU_ITEM_KEY: updateItem.MENU_ITEM_KEY,
            ORDER_STATUS: "PENDING",
        }
        let itemIndex = this.cartMenuItemList.findIndex(item => item.MENU_ITEM_KEY == newItem.MENU_ITEM_KEY);
        this.cartMenuItemList[itemIndex] = arrayObj;
        this.calculateItemPrice();
    }
    
    showUpdatedCustomizeItem(newItem) 
    {
        let updateItem: any = this.cartMenuItemList.find(this.findIndexToUpdateCustomize, newItem.MENU_ITEM_NAME);
        var arrayObj = {
            MENU_ITEM_CATEGORY: updateItem.MENU_ITEM_CATEGORY.trim(),
            MENU_ITEM_CURRENCY: updateItem.MENU_ITEM_CURRENCY,
            MENU_ITEM_INGRADIENTS: updateItem.MENU_ITEM_INGRADIENTS,
            MENU_ITEM_NAME: updateItem.MENU_ITEM_NAME,
            MENU_ITEM_HALF_PRICE: updateItem.MENU_ITEM_HALF_PRICE,
            MENU_ITEM_PRICE: updateItem.MENU_ITEM_PRICE,
            MENU_ITEM_QUANTITY: updateItem.MENU_ITEM_QUANTITY + 1,
            TODAY_SPECIAL: updateItem.TODAY_SPECIAL,
            MENU_ITEM_TOTAL: updateItem.MENU_ITEM_TOTAL,
            MENU_ITEM_IMAGE: updateItem.MENU_ITEM_IMAGE,
            RESTAURENT_ID: updateItem.RESTAURENT_ID,
            MENU_ITEM_KEY: updateItem.MENU_ITEM_KEY,
            ORDER_STATUS: "PENDING",
        }
        let itemIndex = this.cartMenuItemList.findIndex(item => item.MENU_ITEM_NAME == newItem.MENU_ITEM_NAME);
        this.cartMenuItemList[itemIndex] = arrayObj;
        this.calculateItemPrice();
    }

    findIndexToUpdate(newItem) 
    {
        return newItem.MENU_ITEM_KEY === this;
    }
    
    findIndexToUpdateCustomize(newItem) 
    {
        return newItem.MENU_ITEM_NAME === this;
    }
    
    menuItemDetail(Obj)
    {
        console.log(Obj);
//        let navigationExtras: NavigationExtras = {
//            queryParams: {
//                "property_id": this.selectRestaurantKey,
//                "menu_id": Obj.key
//            }
//        };
//        this.router.navigate(['/shopDetail'], navigationExtras);
    }
    
    applyFilter(filterValue: string)
    {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.menuItemList = this.dataSource.filteredData;
        if (this.menuItemList.length == 0)
        {
            this.searchFail = true;
        }
        else 
        {
            this.searchFail = false;
        }
    }
    
    selectCategory(Obj)
    {
        this.showRelated = false;
        this.provider.getRestaurantWiseCategoryFilter(this.selectRestaurantKey, Obj.name.trim(), this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            this.menuItemList = list;
        })
    }
    
    selectMainCategory(Obj)
    {
        this.showRelated = false;
        this.provider.getRestaurantWiseMainCategoryFilter(this.selectRestaurantKey, Obj.trim(), this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            this.menuItemList = list;
        })
    }
    
    selectAll()
    {
        this.showRelated = false;
        this.provider.getRestroWiseMenuList(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            this.menuItemList = list;
        })
    }
    
    async getRestroWiseMenuItem(menuCategoryArray, map)
    {
        await this.provider.getRestroWiseMenuList(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).subscribe(list =>
        {
            if (list.length == 0) 
            {
                this.loading = false;
            }
            this.menuItemList = list;
            this.dataSource = new MatTableDataSource(list);
            this.dataSource.paginator = this.paginator;
            list.forEach(async data => 
            {
                await this.provider.getCategoryName(data.MENU_ITEM_TYPE.trim(), this.countryName).subscribe(list => 
                {
                    menuCategoryArray.push({
                        id: data.MENU_ITEM_TYPE.trim(),
                        name: list[0].key.trim()
                    });
                    for (const item of menuCategoryArray) 
                    {
                        if (!map.has(item.id.trim())) 
                        {
                            map.set(item.id.trim(), true);
                            this.menuCategoryList.push({
                                id: item.id.trim(),
                                name: item.name
                            });
                            this.loading = false;
                        }
                    }
                })
            })
        })
    }
    
    async getRestroWiseSearchMenuItem(menuCategoryArray, map)
    {
        await this.provider.getMenuItemSearch(this.selectRestaurantKey, this.searchValue, this.countryName, this.stateName, this.cityName).subscribe(async list =>
        {
            if (list.length == 0) {
                this.loading = false;
            }
            this.menuItemList = list;
            this.selectCategoryKey = list[0].MENU_CATEGORY_KEY;
            this.provider.getRestaurantWiseCategoryFilter(this.selectRestaurantKey, list[0].MENU_CATEGORY_KEY, this.countryName, this.stateName, this.cityName).subscribe(list => {
                this.showRelated = true;
                this.showRelatedList = list;
            })
            await this.provider.getRestroWiseMenuList(this.selectRestaurantKey, this.countryName, this.stateName, this.cityName).subscribe(list => {
                list.forEach(async data => {
                    await this.provider.getCategoryName(data.MENU_CATEGORY_KEY, this.countryName).subscribe(list => {
                        menuCategoryArray.push({
                            id: data.MENU_CATEGORY_KEY,
                            name: list[0].MTYPE_NAME
                        });
                        for (const item of menuCategoryArray) {
                            if (!map.has(item.id)) {
                                map.set(item.id, true);
                                this.menuCategoryList.push({
                                    id: item.id,
                                    name: item.name
                                });
                                this.loading = false;
                            }
                        }
                    })
                })
            })
        })
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
    
    openSnackBar(message: string, action: string) 
    {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
    
    openLoginDialog()
    {
        let dialogBoxSettings = {
            height: '400px',
            width: '480px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = LoginComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            this.getLoginUserData();
        })
    }
    
    openCustomisableDialog(Obj)
    {
        let dialogBoxSettings = {
            width : '450px',
            height : '340px',
            disableClose: false,
            hasBackdrop: true,
            margin: '0 auto',
            data: {menuKey: Obj.MENU_ITEM_KEY, restaurantKey: Obj.RESTAURENT_ID}
        };
        this.component = CustomisableDialogComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            if (result)
            {
                this.addCart(result);
            }
        })
    }
    
    openMobileNoDialog()
    {
        let dialogBoxSettings = {
            width : '400px',
            height : '350px',
            disableClose: true,
            hasBackdrop: true,
            margin: '0 auto',
        };
        this.component = MobileNoDialogComponent;
        const dialogRef = this.dialog.open(this.component, dialogBoxSettings);
        dialogRef.afterClosed().subscribe(result =>
        {
            if (result)
            {
                this.router.navigate(['/cart']);
            }
        })
    }
    
    viewRatings()
    {
        if (this.countryName)
        {
            this.provider.getRestaurantRatingList(this.countryName, this.stateName, this.cityName, localStorage.getItem("selectRestaurantKey")).subscribe((list: any[]) =>
            {
                if (list.length != 0)
                {
                    let dialogBoxSettings = {
                        width: '680px',
                        height: '600px',
                        disableClose: true,
                        hasBackdrop: true,
                        margin: '0 auto',
                    };
                    this.component = RatingViewComponent;
                    this.dialog.open(this.component, dialogBoxSettings);
                }
            })
        }
    }
    
    onRightClick($event)
    {
        return false;
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
