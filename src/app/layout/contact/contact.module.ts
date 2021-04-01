import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from './contact.component';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {LoginModule} from '../login/login.module';
import {ContactProvider} from './contact.provider';
@NgModule({
    imports: [CommonModule, ContactRoutingModule, AngularMaterialModule, LoginModule],
    declarations: [ContactComponent],
    providers: [ContactProvider]
})
export class ContactModule {}
