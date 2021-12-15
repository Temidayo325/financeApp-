import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { InformationService } from '../Services/Information.service';
import { PersonService } from '../Services/Person.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage implements OnInit {

   code: any;
  constructor(
     private router: Router,
     private toastController: ToastController,
     private loadingController: LoadingController,
     private info: InformationService,
     private user: PersonService
 ) { }

  ngOnInit() {
  }

  verifyUser()
  {
     this.presentLoading("Verifying Account .....")
     if (this.code == '' || this.code == undefined || this.code.length < 5) {
        this.loadingController.dismiss();
        this.presentToast("The verification code is invalid");
     }else{
        // send the data to the backend
        const data = {email: localStorage.getItem("email"), code: this.code};
        this.user.verifyCode(data).subscribe(
           (response) => {
             let information = ( typeof response == 'object') ? response : JSON.parse(response);
             console.log(information)
             if (information.status == 1)
             {
                this.loadingController.dismiss()
                this.presentToast(information.message)
                setTimeout(() => {
                   this.router.navigate(['/home'])
                }, 4000)
             }else{
                this.loadingController.dismiss();
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
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: message,
        spinner: "bubbles",
        backdropDismiss: true
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
  }

  async presentToast(message, time = 4000, type="dark") {
      const toast = await this.toastController.create({
        message: message,
        position: "bottom",
        color: type,
        duration: time
      });
      toast.present();
    }
}
