import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonService } from '../Service/person.service';
import { InformationService } from '../Service/information.service';
import { Network } from  '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController,
     private navctrl: NavController,
     private router: Router,
     private person: PersonService,
     private info: InformationService,
     private network: Network
 ) { }
  public registeredEmail: string = localStorage.getItem("email")
  public user = {email: ( this.registeredEmail !== '') ? this.registeredEmail : '', password: ''}
  public loading : any
  public ModalOpen: true
  public hidePassword: boolean = true
  public passwordType: string = 'password'

  ngOnInit() {

  }
  ionViewWillEnter()
  {
       // watch network for a disconnection
     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
       this.presentToast("No internet connection")
     });
     // stop disconnect watch
     disconnectSubscription.unsubscribe();

  }
  async checkNetwork()
  {
       setTimeout(() => {
             if (this.network.type !== 'none' && this.network.type !== '2g' && this.network.type !== 'unknown') {
               this.login()
          }else{
               this.presentToast("No internet connection")
          }
       }, 2000);
  }
  async login()
  {
     await this.presentLoading("Logging in...");
     let connectSubscription = this.network.onConnect().subscribe(() => {
       console.log('network connected!');
       // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
       // prior to doing any api requests as well.
       setTimeout(() => {
         if (this.network.type !== 'wifi') {
           console.log('we got a wifi connection, woohoo!');
         }
       }, 3000);
     });
     let checked = this.validateData(this.user)
     if (checked) {
        // console.log(this.loading)
        this.loadingctrl.dismiss()
        this.presentToast(checked)
     }else{
        this.person.login(this.user).subscribe(
           async data => {
             console.log(data)
             let parsed = ( typeof data == 'object') ? data : JSON.parse(data);
             console.log(typeof parsed)
            if(parsed.status === 1)
              {
               this.loadingctrl.dismiss()
                this.presentToast("Your login is successful.", 5000, "dark")
                localStorage.setItem("user", JSON.stringify(parsed.data))
                localStorage.setItem("token", parsed.token)
                this.info.store(parsed.data)
                // this.info.storeToken(parsed.token)
                // setTimeout( () => {
                  this.router.navigate(['/tabs/tab1']);
                // }, 5000)
             }else if(parsed.status == 2){
                this.loadingctrl.dismiss()
               this.presentToast(parsed.message, 10000, "dark")
               this.info.store(parsed.user_id);
               console.log(this.info.retrieve());
               localStorage.setItem("user_id", parsed.user_id)
               setTimeout(() => {
                  this.router.navigate(['/verify-password'])
               }, 5000)
             }else{
                this.loadingctrl.dismiss()
                this.presentToast(parsed.message, 10000, "dark")
                console.log(parsed.message)
             }
            }
        )
     }
  }
  forgotPassword()
  {
     this.router.navigate(['/forgot-password'])
  }
  register()
  {
     this.router.navigate(['/register'])
  }
  viewPassword()
  {
       this.hidePassword = !this.hidePassword
       this.passwordType = (this.hidePassword) ? 'password' : 'text'
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
         if (value == undefined || value == null || value.length < 5) {
            return key + " is Invalid"
         }
      }
   }
}
