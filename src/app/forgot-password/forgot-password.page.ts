import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PersonService } from '../Service/person.service';
import { ToastController, LoadingController  } from '@ionic/angular';

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
 ) { }
 public MailHasBeenSent = false
 public email: any
 public code: any
 public userId: any
  async verifyCode()
  {
       await this.presentLoading("Verifying ...");
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
               this.presentToast(information.message)
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
     this.user.ResetPassword(this.email).subscribe(

          response => {
               this.loadingctrl.dismiss()
               if (response.status == 0) {
                    this.presentToast(response.message)
               }else if (response.status == 1) {
                    this.presentToast(response.message)
                    this.userId = response.user_id
                    this.MailHasBeenSent = true
               }else{
                    this.presentToast("Something seems broken, retry in 2 minutes")
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
