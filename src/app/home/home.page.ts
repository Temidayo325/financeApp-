import { Component } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { PersonService } from '../Services/Person.service';
import { InformationService } from '../Services/Information.service';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  	constructor(
	  	public toastController: ToastController,
	  	public navCtrl: NavController,
	  	public loadingController: LoadingController,
	  	public user: PersonService,
      public info: InformationService,
	  	private router: Router,
      private network: Network
  	) { }

  	ToastMessage: String;
  	email: string;
  	password: string;
   loadSpinner: any;

  	route(params){
	  this.router.navigate(params);
	}




	async presentLoading(message)
	{
	    const loader = await this.loadingController.create({
	      cssClass: 'my-custom-class',
	      message: message,
	      spinner: "bubbles",
	      backdropDismiss: true
	    });
	    await loader.present();

	    const { role, data } = await loader.onDidDismiss();
	}

  async presentToast(message, time = 4000, type="dark")
  {
     const toast = await this.toastController.create({
       message: message,
       position: "bottom",
       color: type,
       duration: time
     });
     toast.present();
   }

   // Change login to be able to login even while offline
	login()
	{
		this.presentLoading("Checking your credentials....");
      // console.log(this.loadSpinner)
	   if (this.email == '' || this.password == '' || this.email == undefined || this.password == undefined) {
         this.loadingController.dismiss();
         this.presentToast("Incorrect input ......")
      }else{
         const User = {email: this.email, password: this.password}
         console.log(User);
         this.user.login(User).subscribe(
            async data => {
             console.log(data)
             let parsed = ( typeof data == 'object') ? data : JSON.parse(data);
             console.log(typeof parsed)
            if(parsed.status === 1)
              {
               this.loadingController.dismiss()
                this.presentToast("Your login is successful.", 5000, "dark")
                // localStorage.setItem("user", JSON.stringify(data.user))
                // localStorage.setItem("token", data.token)
                this.info.store(parsed.user);
                setTimeout( () => {
                  this.router.navigate(['/dashboard']);
                }, 5000)
             }else if(parsed.status == 2){
                this.loadingController.dismiss()
               this.presentToast(parsed.message, 10000, "dark")
               localStorage.setItem("email", this.email)
               setTimeout(() => {
                  this.router.navigate(['/verify-user'])
               }, 5000)
             }else{
                this.loadingController.dismiss()
                this.presentToast(parsed.message, 10000, "dark")
                console.log(parsed.message)
             }
            }
         );
      }
	}

	register()
	{
		this.router.navigate(['/register']);
	}

   forgot()
   {
      this.router.navigate(['/forgot-password']);
   }
}
