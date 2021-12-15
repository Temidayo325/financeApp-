import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PersonService } from './Services/Person.service';
import { ExpenseService } from './Services/Expense.service';

import { HttpClientModule } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     HttpClientModule,
     AppRoutingModule,
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     PersonService,
     ExpenseService,
     HTTP,
     Network
      // GoogleChartComponent,

     // ThemeService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
