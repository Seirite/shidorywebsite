import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModule} from '../login/login.module';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {TermsAndConditionRoutingModule} from './terms-and-condition-routing.module';
import {TermsAndConditionComponent} from './terms-and-condition.component';
import {TermsAndConditionProvider} from './terms-and-condition.provider';
@NgModule({
    imports: [CommonModule, TermsAndConditionRoutingModule, AngularMaterialModule, LoginModule],
    declarations: [TermsAndConditionComponent],
    providers: [TermsAndConditionProvider]
})
export class TermsAndConditionModule {}
