import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { PersonService } from '../Services/Person.service';
import { InformationService } from '../Services/Information.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
     private router: Router,
     public loadingController: LoadingController,
     public navController: NavController,
     public toastController: ToastController,
     public person: PersonService,
     public info: InformationService
 ) { }

   public email: string;
  ngOnInit() {
  }
  recover()
  {
     this.presentLoading("Recovering Account ....");
     this.person.recoverPassword(this.email).subscribe(
        (response) => {
           console.log(response)
           this.loadingController.dismiss()
           this.presentToast(response.data.message)
       },
       (error) => {
          console.log(error)
          this.presentToast("Unable to connect to the Internet")
       }
     )
  }

  async presentLoading(message)
	{
	    const loading = await this.loadingController.create({
	      cssClass: 'my-custom-class',
	      message: message,
	      duration: 10000,
	      spinner: "bubbles",
	      backdropDismiss: true
	    });
	    await loading.present();

	    const { role, data } = await loading.onDidDismiss();
	}

  async presentToast(message, time = 4000, type="dark") {
     const toast = await this.toastController.create({
       message: message,
       position: "top",
       color: type,
       duration: time
     });
     toast.present();
   }
}
