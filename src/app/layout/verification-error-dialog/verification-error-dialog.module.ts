import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {VerificationErrorDialogRoutingModule} from './verification-error-dialog-routing.module';
import {VerificationErrorDialogComponent} from './verification-error-dialog.component';
import {VerificationErrorDialogProvider} from './verification-error-dialog.provider';
@NgModule({
    imports: [CommonModule, VerificationErrorDialogRoutingModule, AngularMaterialModule],
    declarations: [VerificationErrorDialogComponent],
    providers: [VerificationErrorDialogProvider]
})
export class VerificationErrorDialogModule {}
