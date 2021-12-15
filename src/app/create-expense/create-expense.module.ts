import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExpensePageRoutingModule } from './create-expense-routing.module';

import { CreateExpensePage } from './create-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateExpensePageRoutingModule
  ],
  declarations: [CreateExpensePage]
})
export class CreateExpensePageModule {}
