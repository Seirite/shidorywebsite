import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderConformComponent} from './order-conform.component';

const routes: Routes = [
    {
        path: '',
        component: OrderConformComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderConformRoutingModule {}
