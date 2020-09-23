import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
// Components
import { AppComponent } from './app.component';
import { ModalBanksComponent } from './components/modal-banks/modal-banks.component';

@NgModule({
    declarations: [
        AppComponent,
        ModalBanksComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        PipesModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        SMS,
        AndroidPermissions,
        OpenNativeSettings,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
