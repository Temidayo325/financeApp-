import { Component } from '@angular/core';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { IncomeService } from '../Service/income.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.page.html',
  styleUrls: ['./create-income.page.scss'],
})
export class CreateIncomePage {

  constructor(
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController,
     private router: Router,
     private revenue: IncomeService,
 ) { }
 public user = JSON.parse(localStorage.getItem("user"))
 public income = {amount: '', user_id: this.user.user_id, source: ''}
 public sources: any

      ionViewWillEnter()
      {
           this.getAvailableIncomeSources()
      }
  async addIncome()
  {
     await this.presentLoading("Adding expense....");
     let checked = this.validateData(this.income)
     if (checked) {
        this.loadingctrl.dismiss()
        this.presentToast(checked)
     }else{
       this.revenue.addIncome(this.income, localStorage.getItem("token")).subscribe(
          response => {
             let information = ( typeof response == 'object') ? response : JSON.parse(response);
             if (information.status == 0) {
                this.loadingctrl.dismiss()
                this.presentToast(information.message)
             }else if (information.status == 1) {
                this.loadingctrl.dismiss()
                this.presentToast(information.message)
                this.income.amount = ''
             }else{
                this.loadingctrl.dismiss()
                this.presentToast(information.message)
             }
          },
          error => {
             console.log(error)
          }
       )
    }
  }
  back()
  {
     this.router.navigate(['/tabs/tab1']);
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
           if (value == undefined || value == null || value.length < 2) {
              return key + " is Invalid"
           }
        }
     }
     getAvailableIncomeSources()
     {
        this.revenue.getSources(localStorage.getItem("token")).subscribe(

          response => {
            this.sources = response.data
            console.log(this.sources)
         },
         error => {
              console.log(error)
         }
      )
     }
}
