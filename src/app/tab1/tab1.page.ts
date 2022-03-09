import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../Service/expense.service';
import { InformationService } from '../Service/information.service';
import { ToastController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
     private router: Router,
     private info: InformationService,
     private expense: ExpenseService,
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController
 ) {}
  public name: any;
  public expenses = "00.00";
  public income = "00.00";
  public categories: any
  async ionViewWillEnter()
  {
     await this.presentLoading("Retrieving data...");
     const userData = JSON.parse(localStorage.getItem("user"));
     this.getFirstName(userData.name)
     this.expense.getExpenseOverview(userData.user_id, localStorage.getItem("token")).subscribe(
        response => {
             let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
             if (parsed.status == 0) {
                this.loadingctrl.dismiss()
                this.presentToast(parsed.message)
                console.log(parsed)
             }else if (parsed.status == 1) {
                this.loadingctrl.dismiss()
                this.expenses = parsed.expenses
                localStorage.setItem("categories" ,JSON.stringify(parsed.categories))
                this.categories = parsed.categories
                this.income = parsed.income
                // this.presentToast("Unable to retrieve current data")
                console.log(parsed)
             }else{
                this.loadingctrl.dismiss()
                this.presentToast("Unable to retrieve current data")
                console.log(parsed)
             }
        },
        (error) => {
           console.log(error);

        }
     )
  }
  getFirstName(name)
  {
     let fullname = name.split(" ")
     this.name = fullname[1]
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
   addExpense()
   {
      this.router.navigate(['/create-expense'])
   }
   addIncome()
   {
      this.router.navigate(['/create-income'])
   }
   viewExpense()
   {
      this.router.navigate(['/tabs/tabs2'])
   }
   viewIncome()
   {
      this.router.navigate(['/tabs/tabs2'])
   }
}
