import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplyCouponRoutingModule} from './apply-coupon-routing.module';
import {ApplyCouponComponent} from './apply-coupon.component';
import {ApplyCouponProvider} from './apply-coupon.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
@NgModule({
    imports: [CommonModule, ApplyCouponRoutingModule, AngularMaterialModule],
    declarations: [ApplyCouponComponent],
    providers: [ApplyCouponProvider]
})
export class ApplyCouponModule {}
