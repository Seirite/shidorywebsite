import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeliveryAddressComponent} from './delivery-address.component';

const routes: Routes = [
    {
        path: '',
        component: DeliveryAddressComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryAddressRoutingModule {}
