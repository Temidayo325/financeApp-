import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { PersonService } from '../Services/Person.service';
import { InformationService } from '../Services/Information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
     public user: PersonService,
     private info: InformationService,
     public toastController: ToastController,
  	  public navCtrl: NavController,
  	  public loadingController: LoadingController,
  	  private router: Router

 ) { }

      ToastMessage: String;
      name: string;
      email: string;
      password: string;
      password2: string;
      gender: string;
      phone: string;
      tc: any;

  ngOnInit() {
  }

  login()
	{
		this.router.navigate(['/home']);
	}

  async presentLoading(message)
	{
	    const loading = await this.loadingController.create({
	      cssClass: 'my-custom-class',
	      message: message,
	      spinner: "dots",
	      backdropDismiss: true
	    });
	    await loading.present();
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

	register()
	{
		this.presentLoading("Creating your account....");
		// console.log(this.email+ "  "+ this.password);
		if (this.email == '' || this.password == '' || this.name == '' || this.gender == '' || this.phone == '' || this.email == undefined || this.password == undefined || this.name == undefined || this.gender == undefined || this.phone == undefined || this.tc == undefined ) {

         this.presentToast("Invalid input...");
         this.loadingController.dismiss();
      }else{
         if (this.password !== this.password2) {
            this.presentToast("Your passwords does not match...");
            this.loadingController.dismiss();
         }else{
            const User = {
               email: this.email,
               password: this.password,
               name: this.name,
               gender: this.gender,
               phoneNumber: this.phone
            }
            this.user.Signup(User).subscribe(
                response => {
                    console.log(response)
                     let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                    if(parsed.status === 1)
                    {
                      this.loadingController.dismiss()
                      this.presentToast("Your registration is successful.", 5000, "dark")
                      this.info.store(parsed.user)
                      setTimeout(() => {
                        this.router.navigate(['/verify-user']);
                      }, 5000)
                    }else{
                      this.loadingController.dismiss()
                      this.presentToast(parsed.message, 5000, "dark")
                      console.log(parsed)
                    }
               },
               (error) => {
                  console.log(error);
               }
            )
         }
      }
	}
}
