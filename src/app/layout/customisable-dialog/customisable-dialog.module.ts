import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomisableDialogRoutingModule} from './customisable-dialog-routing.module';
import {CustomisableDialogComponent} from './customisable-dialog.component';
import {CustomisableDialogProvider} from './customisable-dialog.provider';
@NgModule({
    imports: [CommonModule, CustomisableDialogRoutingModule],
    declarations: [CustomisableDialogComponent],
    providers: [CustomisableDialogProvider]
})
export class CustomisableDialogModule {}
