import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReservationRoutingModule} from './reservation-routing.module';
import {ReservationComponent} from './reservation.component';
import {AngularMaterialModule} from '../../app-module/angular-matrial.module';
import {ReservationProvider} from './reservation.provider';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {AgmCoreModule} from '@agm/core';
import {VerificationDialogModule} from '../verification-dialog/verification-dialog.module';
import {VerificationErrorDialogModule} from '../verification-error-dialog/verification-error-dialog.module';
@NgModule({
    imports: [CommonModule, ReservationRoutingModule, AngularMaterialModule, GooglePlaceModule, VerificationDialogModule, VerificationErrorDialogModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs'})],
    declarations: [ReservationComponent],
    providers: [ReservationProvider]
})
export class ReservationModule {}
