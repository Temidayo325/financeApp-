import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExpensePage } from './create-expense.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExpensePageRoutingModule {}
