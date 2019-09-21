import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MobileNoDialogComponent} from './mobile-no-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: MobileNoDialogComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MobileNoDialogRoutingModule {}
