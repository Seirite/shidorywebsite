import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {CartProvider} from './cart.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {AlertDialogModule} from '../alert-dialog/alert-dialog.module';
import {ApplyCouponModule} from '../apply-coupon/apply-coupon.module';
import {LoginModule} from '../login/login.module';
import {OtpDialogModule} from '../otp-dialog/otp-dialog.module';
import {DeliveryAddressModule} from '../delivery-address/delivery-address.module';
import {WindowRef} from '../Razorpay/windowRef.service';
@NgModule({
    imports: [CommonModule, CartRoutingModule, AngularMaterialModule, GooglePlaceModule, AlertDialogModule, ApplyCouponModule, LoginModule, OtpDialogModule, DeliveryAddressModule],
    declarations: [CartComponent],
    providers : [CartProvider, WindowRef],
})
export class CartModule {}
