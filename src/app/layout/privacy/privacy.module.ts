import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModule} from '../login/login.module';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {PrivacyRoutingModule} from './privacy-routing.module';
import {PrivacyComponent} from './privacy.component';
import {PrivacyProvider} from './privacy.provider';
@NgModule({
    imports: [CommonModule, PrivacyRoutingModule, AngularMaterialModule, LoginModule],
    declarations: [PrivacyComponent],
    providers: [PrivacyProvider]
})
export class PrivacyModule {}
