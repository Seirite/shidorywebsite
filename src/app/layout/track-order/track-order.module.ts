import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrackOrderRoutingModule} from './track-order-routing.module';
import {TrackOrderComponent} from './track-order.component';
import {TrackOrderProvider} from './track-order.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {AgmCoreModule} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
    imports: [CommonModule, TrackOrderRoutingModule, AngularMaterialModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs'}), AgmDirectionModule],
    declarations: [TrackOrderComponent],
    providers: [TrackOrderProvider]
})
export class TrackOrderModule {}
