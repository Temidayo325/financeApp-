import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIncomePage } from './create-income.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIncomePageRoutingModule {}
