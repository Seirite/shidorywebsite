import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomisableDialogComponent} from './customisable-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: CustomisableDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomisableDialogRoutingModule {}
