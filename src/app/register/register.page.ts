import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonService } from '../Service/person.service';
import { InformationService } from '../Service/information.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController,
     private navctrl: NavController,
     private router: Router,
     private person: PersonService,
     private info: InformationService
 ) { }
  public user = {name: '', email: '', phoneNumber: '', gender: '', password: '', password2: ''}
  public hidePassword: boolean = true
  public passwordType: string = 'password'
  public hideConfirmPassword: boolean = true
  public passwordConfirmType: string = 'password'
  ngOnInit() {
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
   validateData(data: object)
   {
      for(let [key, value] of Object.entries(data))
      {
         if (value == undefined || value == null || value.length <= 3) {
            return key + " is Invalid"
         }
      }
   }
   login()
   {
      this.router.navigate(['/login']);
   }
   async register()
   {
      await this.presentLoading("Creating your account ......");
      let checked = this.validateData(this.user)
      if (checked) {
         this.loadingctrl.dismiss()
         this.presentToast(checked)
      }else{
         if (this.user.password === this.user.password2) {
            this.person.Signup(this.user).subscribe(
               response => {
                    console.log(response)
                     let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                    if(parsed.status === 1)
                    {
                      this.loadingctrl.dismiss()
                      this.presentToast("Your registration is successful.", 5000, "dark")
                      this.info.store(parsed.data)
                      localStorage.setItem("email", parsed.data.email)
                      localStorage.setItem("user_id", parsed.data.user_id)
                      setTimeout(() => {
                        this.router.navigate(['/verify-password']);
                      }, 5000)
                    }else{
                      this.loadingctrl.dismiss()
                      this.presentToast(parsed.message, 5000, "dark")
                      console.log(parsed)
                    }
               },
               (error) => {
                  console.log(error);
               }
            )
         }else{
            this.loadingctrl.dismiss()
            this.presentToast("The passwords do not match")
         }

      }
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
