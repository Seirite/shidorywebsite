import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderConformRoutingModule} from './order-conform-routing.module';
import {OrderConformComponent} from './order-conform.component';
import {OrderConformProvider} from './order-conform.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {TrackOrderComponent} from '../track-order/track-order.component';
import {TrackOrderProvider} from '../track-order/track-order.provider';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {TrackOrderModule} from '../track-order/track-order.module';
import {LoginModule} from '../login/login.module';
import {RestroRatingModule} from '../restro-rating/restro-rating.module';
@NgModule({
    imports: [CommonModule, OrderConformRoutingModule,  AngularMaterialModule, LoginModule, TrackOrderModule, RestroRatingModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs'}), AgmDirectionModule],
    declarations: [OrderConformComponent,],
    providers: [OrderConformProvider, TrackOrderProvider],
    entryComponents: [TrackOrderComponent]
})
export class OrderConformModule {}
