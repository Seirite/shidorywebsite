import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertDialogRoutingModule} from './alert-dialog-routing.module';
import {AlertDialogComponent} from './alert-dialog.component';
import {AlertDialogProvider} from './alert-dialog.provider';
@NgModule({
    imports: [CommonModule, AlertDialogRoutingModule],
    declarations: [AlertDialogComponent],
    providers: [AlertDialogProvider]
})
export class AlertDialogModule {}
