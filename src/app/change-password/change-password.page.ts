import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../Service/person.service';
import { InformationService } from '../Service/information.service';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Network } from  '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage  {

  public change : any = {password: '', password2: '', user_id: localStorage.getItem('user_id')}
  public hidePassword: boolean = true
  public passwordType: string = 'password'
  public hideConfirmPassword: boolean = true
  public passwordConfirmType: string = 'password'
  constructor(
    private router: Router,
     private info: InformationService,
     private user: PersonService,
     private toastCtrl: ToastController,
     private loadingctrl: LoadingController,
     private network: Network
  ) { }

 async ionViewWillEnter()
 {

 }
 back()
 {
     this.router.navigate(['/forgot-password'])
 }
 changePassword()
 {
      if (this.change.password !== this.change.password2) {
           this.presentToast("Your passwords dom not match.")
      }
      this.user.changePassword(this.change).subscribe(
           (response) => {
                this.loadingctrl.dismiss()
                let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                console.log(parsed)
                if (parsed.status == 0) {
                      this.presentLoading(parsed.message)
                }
                this.presentToast(parsed.message)
                this.router.navigate(['/login'])
           },
           (error) => {
                this.loadingctrl.dismiss()
                console.log(error)
                this.presentToast("Unable to perform request, try again")
           }
      )
 }
 async checkNetwork()
 {
      this.presentLoading("Reseting your password...")
      setTimeout(() => {
            if (this.network.type !== 'none' && this.network.type !== '2g' && this.network.type !== 'unknown') {
              this.changePassword()
         }else{
              this.loadingctrl.dismiss()
              this.presentToast("No internet connection")
         }
      }, 2000);
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
   viewPassword()
   {
        this.hidePassword = !this.hidePassword
        this.passwordType = (this.hidePassword) ? 'password' : 'text'
   }
   viewConfirmPassword()
   {
       this.hideConfirmPassword = !this.hideConfirmPassword
       this.passwordConfirmType = (this.hideConfirmPassword) ? 'password' : 'text'
   }
}
