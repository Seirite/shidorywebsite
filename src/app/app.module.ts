import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';
import {SiUtil} from './utility/SiUtil';
import {AngularMaterialModule} from './app-module/angular-matrial.module';
import {firestoreService} from './utility/firestoreService';
import {AuthService} from './utility/auth-service';
import {NotifyService} from './utility/NotifyService';
import {ResourceBundle} from './utility/ResourceBundle';
import {HttpModule} from '@angular/http';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
};

var config = {
    apiKey: "AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs",
    authDomain: "shidory-c2c4c.firebaseapp.com",
    databaseURL: "https://shidory-c2c4c.firebaseio.com",
    projectId: "shidory-c2c4c",
    storageBucket: "shidory-c2c4c.appspot.com",
    messagingSenderId: "197051992446",
    appId: "1:197051992446:web:39fa7634d72f37b7"
};

@NgModule({
    imports: [
        AppRoutingModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule.enablePersistence(),
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot(), // ToastrModule added
        AngularMaterialModule
//        MatDialogModule
    ],
    declarations: [AppComponent],
    providers: [firestoreService, AuthService, AngularFireAuth, NotifyService, ResourceBundle, SiUtil, {provide: FirestoreSettingsToken, useValue:{}}],
    bootstrap: [AppComponent]
})
export class AppModule {}
