import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeliveryAddressRoutingModule} from './delivery-address-routing.module';
import {DeliveryAddressComponent} from './delivery-address.component';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {DeliveryAddressProvider} from './delivery-address.provider';
@NgModule({
    imports: [CommonModule, DeliveryAddressRoutingModule, AngularMaterialModule],
    declarations: [DeliveryAddressComponent],
    providers: [DeliveryAddressProvider],
})
export class DeliveryAddressModule {}
