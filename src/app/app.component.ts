import { Component } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
       private splashScreen: SplashScreen,
       private platform: Platform
 ) {
      this.splashScreen.show();
      this.initializeApp()
}
initializeApp()
{
     this.platform.ready().then( () => {
          this.splashScreen.hide()
     })
}
}
