import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PersonService } from '../Service/person.service';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Network } from  '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  constructor(
       private router: Router,
       private user: PersonService,
       private toastCtrl: ToastController,
       public loadingctrl: LoadingController,
       private network: Network
 ) { }
 public MailHasBeenSent = false
 public email: any
 public code: any
 public userId: any

 ionViewWillEnter()
 {
      // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast("No internet connection")
    });
    // stop disconnect watch
    disconnectSubscription.unsubscribe();

 }
 async checkNetwork()
 {
      setTimeout(() => {
            if (this.network.type !== 'none' && this.network.type !== '2g' && this.network.type !== 'unknown') {
              this.requestCode()
         }else{
              this.presentToast("No internet connection")
         }
      }, 2000);
 }
  async verifyCode()
  {
       await this.presentLoading("Verifying ...");
       if (this.network.type === 'none' || this.network.type === '2g' || this.network.type === 'unknown')
       {
            this.loadingctrl.dismiss()
            this.presentToast("No internet connection")
       }

       if(this.code == undefined || this.code == null || this.code.length <= 5)
      {
         this.loadingctrl.dismiss()
         this.presentToast("The code you entered is invalid")
    }else{
         this.user.verifyCode({user_id: this.userId, code: this.code}).subscribe(
           (response) => {
           let information = ( typeof response == 'object') ? response : JSON.parse(response);
           console.log(information)
           if (information.status == 1)
           {
               this.loadingctrl.dismiss()
               this.presentToast("Your account has been recovered, proceed to change your password")
               localStorage.setItem('user_id', this.userId)
               this.router.navigate(['/change-password'])
           }else{
               this.loadingctrl.dismiss();
               this.presentToast(information.message);
           }
         },
         (error) => {
           console.log(error)
         }
        )
    }
  }
  async requestCode()
  {
      await this.presentLoading("Confirming your mail .......")
     this.user.resetPassword({email: this.email}).subscribe(
          response => {
               this.loadingctrl.dismiss()
               let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
               console.log(parsed)
               if (parsed.status == 0) {
                    this.presentToast(parsed.message)
               }else if (parsed.status == 1) {
                    this.presentToast(parsed.message)
                    this.userId = parsed.user_id
                    localStorage.setItem('email', this.email)
                    this.MailHasBeenSent = true
               }else{
                    this.presentToast("Something seems broken, retry in a bit")
               }
          },
          error => {
               this.loadingctrl.dismiss()
               this.presentToast(error)
          }
     )
  }
  back()
  {
       this.router.navigate(['/login'])
  }
  async presentLoading(message)
  {
       const loading = await this.loadingctrl.create({
         cssClass: 'my-custom-class',
         message: message,
         spinner: "lines-sharp",
         backdropDismiss: true,
         id: 'loader'
      });
      await loading.present();
  }
  async presentToast(message, time = 4000, type="dark")
  {
      const toast = await this.toastCtrl.create({
       message: message,
       position: "bottom",
       color: type,
       duration: time
      });
      toast.present();
   }
}
