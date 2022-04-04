import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Network } from  '@awesome-cordova-plugins/network/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Platform } from '@ionic/angular'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     HTTP,
     Network,
     SplashScreen,
     Platform
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
