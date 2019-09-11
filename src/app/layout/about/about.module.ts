import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutComponent} from './about.component';
import {AboutRoutingModule} from './about-routing.module';
import {LoginModule} from '../login/login.module';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {AboutProvider} from './about.provider';
@NgModule({
    imports: [CommonModule, AboutRoutingModule, AngularMaterialModule, LoginModule],
    declarations: [AboutComponent],
    providers: [AboutProvider]
})
export class AboutModule {}
