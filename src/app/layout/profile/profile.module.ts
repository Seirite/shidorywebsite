import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {ProfileProvider} from './profile.provider';
import {ViewDetailModule} from '../view-detail/view-detail.module';
import {ConformationDialogModule} from '../conformation-dialog/conformation-dialog.module';
@NgModule({
    imports: [CommonModule, ProfileRoutingModule, AngularMaterialModule, ViewDetailModule, ConformationDialogModule],
    declarations: [ProfileComponent],
    providers: [ProfileProvider],
})
export class ProfileModule {}
