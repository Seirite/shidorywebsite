import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OtpDialogComponent} from './otp-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: OtpDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OtpDialogRoutingModule {}
