import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerificationDialogComponent} from './verification-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: VerificationDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerificationDialogRoutingModule {}
