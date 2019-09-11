import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {HomeProvider} from './home-provider';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {TrackOrderComponent} from '../track-order/track-order.component';
import {TrackOrderModule} from '../track-order/track-order.module';
import {LoginModule} from '../login/login.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        GooglePlaceModule,
        AngularMaterialModule,
        TrackOrderModule,
        LoginModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [TrackOrderComponent],
    providers:[HomeProvider]
})
export class HomeModule {}
