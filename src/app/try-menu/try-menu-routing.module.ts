import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TryMenuPage } from './try-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TryMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryMenuPageRoutingModule {}
