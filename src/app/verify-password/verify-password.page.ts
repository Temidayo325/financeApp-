import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonService } from '../Service/person.service';
import { InformationService } from '../Service/information.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.page.html',
  styleUrls: ['./verify-password.page.scss'],
})
export class VerifyPasswordPage implements OnInit {

  constructor(
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController,
     private navctrl: NavController,
     private router: Router,
     private person: PersonService,
     private info: InformationService
 ) { }
  public code: any
  ngOnInit() {
  }
  async verify()
  {
     await this.presentLoading("Verifying your account...");
     if(this.code == undefined || this.code == null || this.code.length <= 5)
     {
        this.loadingctrl.dismiss()
        this.presentToast("The code you entered is invalid")
     }else{
        const user = this.info.retrieve()
        console.log(user)
        this.person.verifyCode({user_id: localStorage.getItem("user_id"), code: this.code}).subscribe(
           (response) => {
           let information = ( typeof response == 'object') ? response : JSON.parse(response);
           console.log(information)
           if (information.status == 1)
           {
               this.loadingctrl.dismiss()
               this.presentToast(information.message)
               // setTimeout(() => {
                  this.router.navigate(['/login'])
               // }, 4000)
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
