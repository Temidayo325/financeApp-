import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../Services/Person.service';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { InformationService } from '../Services/Information.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   ageRange: any[];
   occupation: any[];
   monthlyIncome: any[];
   age: string;
   job: string;
   income: string;
   picture: string;
   image: any;
   name: any;
   userData: any;
  constructor(
     private router: Router,
     private user: PersonService,
     public toastController: ToastController,
     public navCtrl: NavController,
     public loadingController: LoadingController,
     public info: InformationService,
 ) { }

  ngOnInit()
  {

  }

  ionViewWillEnter()
  {
     this.ageRange = ['0-14 years', '15-18 years', '19-23 years', '24-29 years', '30-40 years', '41-60 years', 'Above 60 years'];
     this.occupation = ['Student', 'Self employed', 'Business owner', 'Entreprenuer', 'Public servant', 'Medicals'];
     this.monthlyIncome  = ['0-10,000k', '11,000-50,000k', '51,000-150,000k', '151,000-300,000k', 'Above 300,000k'];
     this.userData = this.info.retrieve()
     this.name = "adekeye Rhoda"
     this.generateAvatar(this.splitName())
  }
  back()
  {
     this.router.navigate(['/dashboard']);
  }

  saveAge()
  {
     this.presentLoading("Updating Information....");
     if (this.age == '') {
        this.loadingController.dismiss();
        this.presentToast("Oops! Kindly check that your age is valid");
     }else{
        const userData = this.info.retrieve();
        const data = {user_id: userData.user_token, information: this.age, category: "age"};
        this.user.updateInfo(data).subscribe(
           (response) => {
             this.loadingController.dismiss();
             this.presentToast(response.message);
             console.log(response)
          },
          (error) => {
             this.loadingController.dismiss();
            this.presentToast(error);
            console.log(error)
          }
        )
     }
  }

  saveJob()
  {
     this.presentLoading("Updating Information....");
     if (this.age == '') {
        this.loadingController.dismiss();
        this.presentToast("Oops! Kindly check that your age is valid");
     }else{
        const userData = this.info.retrieve();
        const data = {user_id: userData.user_token, information: this.age, category: "job"};
        this.user.updateInfo(data).subscribe(
           (response) => {
             this.loadingController.dismiss();
             this.presentToast(response.message);
             console.log(response)
          },
          (error) => {
             this.loadingController.dismiss();
            this.presentToast(error);
            console.log(error)
          }
        )
     }
  }

  saveIncome()
  {
     this.presentLoading("Updating Information....");
     if (this.age == '') {
        this.loadingController.dismiss();
        this.presentToast("Oops! Kindly check that your age is valid");
     }else{
        const userData = this.info.retrieve();
        const data = {user_id: userData.user_token, information: this.age, category: "income"};
        this.user.updateInfo(data).subscribe(
           (response) => {
             this.loadingController.dismiss();
             this.presentToast(response.message);
             console.log(response)
          },
          (error) => {
             this.loadingController.dismiss();
            this.presentToast(error);
            console.log(error)
          }
        )
     }
  }

savePicture()
{
   this.presentLoading("Updating picture....");
   if (this.age == '') {
     this.loadingController.dismiss();
     this.presentToast("Oops! Kindly check that your age is valid");
   }else{
     const userData = this.info.retrieve();
     const data = {user_id: userData.user_token, information: this.picture, category: "picture"};
     this.user.updateInfo(data).subscribe(
         (response) => {
           this.loadingController.dismiss();
           this.presentToast(response.message);
           console.log(response)
        },
        (error) => {
           this.loadingController.dismiss();
          this.presentToast(error);
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

  generateAvatar(text, foregroundColor = '#00C1C1', backgroundColor = '#fff')
  {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = 200;
      canvas.height = 200;

      // Draw background
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = "bold 100px Assistant";
      context.fillStyle = foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      this.image =  canvas.toDataURL("image/png");
  }
  splitName():string
  {
     let names = this.name.split(" ");
     let initials = names.map((elem)=>{ return elem.charAt(0).toUpperCase()});
     return initials.toString().replace(',', '');
  }
}
