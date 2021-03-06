import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {ShopProvider} from './shop.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {AlertDialogModule} from '../alert-dialog/alert-dialog.module';
import {LoginModule} from '../login/login.module';
import {CustomisableDialogModule} from '../customisable-dialog/customisable-dialog.module';
import {MobileNoDialogModule} from '../mobile-no-dialog/mobile-no-dialog.module';
import {RatingViewModule} from '../rating-view/rating-view.module';
@NgModule({
    imports: [CommonModule, ShopRoutingModule, AngularMaterialModule, AlertDialogModule, LoginModule, CustomisableDialogModule, MobileNoDialogModule, RatingViewModule],
    declarations: [ShopComponent],
    providers: [ShopProvider],
})
export class ShopPageModule {}
