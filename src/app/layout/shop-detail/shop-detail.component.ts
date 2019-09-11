import { Component, OnInit } from '@angular/core';
import {SiUtil} from '../../utility/SiUtil';
import {ActivatedRoute} from '@angular/router';
import {ShopDetailProvider} from './shop-detail.provider';
import {Subscription} from 'rxjs';
import {ADD_RESTAURANT_MST} from '../../pojos/ADD_RESTRAUNT_MST';

@Component({
    selector: 'app-shop-detail',
    templateUrl: './shop-detail.component.html',
    styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
    
    cartLength: string;
    selectMenuItemKey: any;
    menuItemList: any;
    loading: boolean = false;
    menuCategoryList: any[] = [];
    restroName: string;
    selectRestaurantKey: any;
    sub: Subscription;
    
    constructor(private util:SiUtil, private route: ActivatedRoute, public provider: ShopDetailProvider) {}

    ngOnInit() {
        this.loading = true;
        var menuCategoryArray = [];
        const map = new Map();
        this.sub = this.route.queryParams.subscribe(async params =>
        {
            this.selectRestaurantKey = params["property_id"];
            this.selectMenuItemKey = params["menu_id"];
            this.cartLength = localStorage.getItem("cartLength");
            await this.provider.getRestroData(this.selectRestaurantKey).then((restroObject: ADD_RESTAURANT_MST) =>
            {
                this.restroName = restroObject.RESTRO_NAME;
            })
            await this.provider.getRestroWiseMenuList(this.selectRestaurantKey).subscribe(list =>
            {
                this.menuItemList = list;
                list.forEach(async data =>
                {
                    await this.provider.getCategoryName(data.MENU_CATEGORY_KEY).subscribe(list =>
                    {
                        this.loading = false;
                        menuCategoryArray.push({
                            id: data.MENU_CATEGORY_KEY,
                            name: list[0].MTYPE_NAME
                        });
                        for (const item of menuCategoryArray) 
                        {
                            if (!map.has(item.id)) 
                            {
                                map.set(item.id, true);
                                this.menuCategoryList.push({
                                    id: item.id,
                                    name: item.name
                                });
                            }
                        }
                        console.log(this.menuCategoryList);
                    })
                })
            })
            
        })
    }
    
    getMenuObject()
    {
        this.provider.getMenuData(this.selectMenuItemKey).then(menuObject =>
        {
            console.log(menuObject);
        })
    }
}
