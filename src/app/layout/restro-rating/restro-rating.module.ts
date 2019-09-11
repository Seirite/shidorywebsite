import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestroRatingRoutingModule} from './restro-rating-routing.module';
import {RestroRatingComponent} from './restro-rating.component';
import {RestroRatingProvider} from './restro-rating.provider';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
@NgModule({
    imports: [CommonModule, RestroRatingRoutingModule, AngularMaterialModule],
    declarations: [RestroRatingComponent],
    providers: [RestroRatingProvider]
})
export class RestroRatingModule {}
