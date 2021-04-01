import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConformationDialogComponent} from './conformation-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: ConformationDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConformationDialogRoutingModule {}
