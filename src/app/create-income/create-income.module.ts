import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIncomePageRoutingModule } from './create-income-routing.module';

import { CreateIncomePage } from './create-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateIncomePageRoutingModule
  ],
  declarations: [CreateIncomePage]
})
export class CreateIncomePageModule {}
