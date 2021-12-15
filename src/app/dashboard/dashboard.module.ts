import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import '@google-web-components/google-chart';
// import { GoogleChartComponent } from 'angular-google-charts';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
// import { ChartsModule } from 'ng2-charts';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    // GoogleChartComponent
  ],
  providers: [
   // ChartsModule
 ],
  declarations: [DashboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
