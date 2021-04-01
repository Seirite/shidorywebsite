import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobileNoDialogRoutingModule} from './mobile-no-dialog-routing.module';
import {MobileNoDialogComponent} from './mobile-no-dialog.component';
import {MobileNoDialogProvider} from './mobile-no-dialog.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
@NgModule({
    imports: [CommonModule, MobileNoDialogRoutingModule, AngularMaterialModule],
    declarations: [MobileNoDialogComponent],
    providers: [MobileNoDialogProvider]
})
export class MobileNoDialogModule {}
