import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
  	public toastController: ToastController, 
  	public navCtrl: NavController, 
  	public loadingController: LoadingController, 
  	public RegisterService: RegisterService, 
  	private router: Router
	) { }
  
  	ToastMessage: String;
  	name: string;
  	email: string;
  	password: string;


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
	      duration: 4000,
	      spinner: "bubbles",
	      backdropDismiss: true
	    });
	    await loading.present();

	    const { role, data } = await loading.onDidDismiss();
	    //console.log('Loading dismissed!');
	}

	async presentToast() 
  	{
	    const toast = await this.toastController.create({
	      message: 'Your settings have been saved.',
	      duration: 2000
	    });
	    toast.present();
	}

	register()
	{
		this.presentLoading("Creating your account....");
		// console.log(this.email+ "  "+ this.password);
		const User = {email: this.email, password: this.password, name: this.name}
		this.RegisterService.trySignup(User).subscribe(
			async data => {
				console.log(data)
			}
		)
	}
}
