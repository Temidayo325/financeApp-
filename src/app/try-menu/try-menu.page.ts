import { Component, OnInit } from '@angular/core';
import { MenuController  } from '@ionic/angular';

@Component({
  selector: 'app-try-menu',
  templateUrl: './try-menu.page.html',
  styleUrls: ['./try-menu.page.scss'],
})
export class TryMenuPage implements OnInit {

  constructor(
     private menu: MenuController
 ) { }

  ngOnInit() {
  }

   openFirst()
   {
      this.menu.enable(true, 'first');
      this.menu.open('first');
   }
}
