import { Component } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

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
	  	public loginservice: LoginService, 
	  	private router: Router
  	) { }
  	
  	ToastMessage: String;
  	email: string;
  	password: string;

  	route(params){
	  this.router.navigate(params);
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

	login()
	{
		this.presentLoading("Checking your credentials....");
		console.log(this.email+ "  "+ this.password);
		const User = {email: this.email, password: this.password}
		this.loginservice.tryLogin(User).subscribe(
			async data => {
				console.log(data)
			}
		)
	}

	register()
	{
		this.router.navigate(['/register']);
	}
}
