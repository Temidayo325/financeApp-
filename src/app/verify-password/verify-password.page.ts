import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { PersonService } from '../Services/Person.service';
import { InformationService } from '../Services/Information.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.page.html',
  styleUrls: ['./verify-password.page.scss'],
})
export class VerifyPasswordPage implements OnInit {

  constructor(
     private router: Router,
     public loadingController: LoadingController,
     public toastController: ToastController,
     public navController: NavController,
     private person: PersonService,
     private user: InformationService
 ) { }

   private info : any;
  ngOnInit() {
     this.info = this.user.retrieve();
  }

  verify()
  {
     let data = {"user_id": this.info.user_token, "code": this.info.code}
     this.person.verifyCode(data).subscribe( (response) => {
        console.log(response)
     });
  }

  resendVerification()
  {

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
