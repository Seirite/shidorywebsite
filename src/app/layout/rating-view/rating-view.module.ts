import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingViewRoutingModule} from './rating-view-routing.module';
import {RatingViewComponent} from './rating-view.component';
import {RatingViewProvider} from './rating-view.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
@NgModule({
    imports: [CommonModule, RatingViewRoutingModule, AngularMaterialModule],
    declarations: [RatingViewComponent],
    providers: [RatingViewProvider]
})
export class RatingViewModule {}
