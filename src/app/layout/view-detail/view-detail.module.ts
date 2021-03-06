import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewDetailRoutingModule} from './view-detail-routing.module';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {ViewDetailComponent} from './view-detail.component';
import {ViewDetailProvider} from './view-detail.provider';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
@NgModule({
    imports: [CommonModule, ViewDetailRoutingModule, AngularMaterialModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs'}), AgmDirectionModule],
    declarations: [ViewDetailComponent],
    providers: [ViewDetailProvider]
})
export class ViewDetailModule {}
