import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './menu.component';
import {MenuProvider} from './menu.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {LoginModule} from '../login/login.module';
import {AgmCoreModule} from '@agm/core';
@NgModule({
    imports: [CommonModule, MenuRoutingModule,  AngularMaterialModule, LoginModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs'})],
    declarations: [MenuComponent],
    providers: [MenuProvider]
})
export class MenuModule {}
