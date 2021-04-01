import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerificationErrorDialogComponent} from './verification-error-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: VerificationErrorDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerificationErrorDialogRoutingModule {}
