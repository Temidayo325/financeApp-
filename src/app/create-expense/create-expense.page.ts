import { Component } from '@angular/core';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExpenseService } from '../Service/expense.service';
// import { InformationService } from '../Service/information.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
})
export class CreateExpensePage {

  constructor(
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController,
     private router: Router,
     private expenses: ExpenseService
  ) { }
  public user = JSON.parse(localStorage.getItem("user"))
  public expense = {category: '', amount: '', user_id: this.user.user_id, description: ''}
  public categories = JSON.parse(localStorage.getItem("categories"))

 ionViewWillEnter()
 {

 }

 async addExpense()
 {
    await this.presentLoading("Adding expense....");
    let checked = this.validateData(this.expense)
    if (checked) {
       this.loadingctrl.dismiss()
       this.presentToast(checked)
    }else{
      this.expenses.addExpense(this.expense, localStorage.getItem("token")).subscribe(
         response => {
            console.log(response)
            let information = ( typeof response == 'object') ? response : JSON.parse(response);
            if (information.status == 0) {
               this.loadingctrl.dismiss()
               this.presentToast(information.message)
            }else if (information.status == 1) {
               this.loadingctrl.dismiss()
               this.presentToast("Expense recorded successfully")
               this.expense.amount = ''
               this.expense.category = ''
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
             return key + " is Invalid" + value
          }
       }
    }
}
