import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TryMenuPageRoutingModule } from './try-menu-routing.module';

import { TryMenuPage } from './try-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TryMenuPageRoutingModule
  ],
  declarations: [TryMenuPage]
})
export class TryMenuPageModule {}
