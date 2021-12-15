import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../Services/person.service';
import { InformationService } from '../Services/information.service';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

   public feedback: string;
  constructor(
     public toastController: ToastController,
     public navCtrl: NavController,
     public loadingController: LoadingController,
     private router: Router,
     private person: PersonService,
     private user: InformationService
 ) { }

  ngOnInit() {
  }
  back()
  {
     this.router.navigate(['/dashboard']);
  }

  submitFeedback()
  {
     // introduce the loader
     this.presentLoading("Submitting feedback/Complaint......")
     if (this.feedback.length > 3) {
        const userData = this.user.retrieve();
        const data = {user_id : userData.user_token, feedback: this.feedback};
        this.person.submitFeedback(data).subscribe(
           (response) => {
             if (response.status == 1) {
                this.loadingController.dismiss();
                this.presentToast(response.message);
                this.feedback = '';
             }else{
                this.loadingController.dismiss();
                this.presentToast(response.message);
             }
          },
          (error) => {
             // present toast
             this.loadingController.dismiss();
             this.presentToast(error);
          }
        );
     }else{
        // make Toast
        this.loadingController.dismiss();
        this.presentToast("Oops! Your feedback is invalid.")
     }
  }

  async presentLoading(message)
  {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: message,
        duration: 7000,
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
