import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { PersonService } from '../Service/person.service';
import { ExpenseService } from '../Service/expense.service';
import { ToastController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
     private router: Router,
     // private person: PersonService,
     private expense: ExpenseService,
     private toastCtrl: ToastController,
     public loadingctrl: LoadingController
 ) {}
   public expenses: any
   public total = "00.00"
   async ionViewWillEnter()
   {
      await this.presentLoading("Retrieving your expense....")
      const userData = JSON.parse(localStorage.getItem("user"))
     this.expense.getUserExpense(userData.user_id, localStorage.getItem("token")).subscribe(
        response => {
             let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
             console.log(parsed)
             if (parsed.status == 0) {
                this.loadingctrl.dismiss()
                this.presentToast(parsed.message)
                console.log(parsed)
             }else if (parsed.status == 1) {
                this.loadingctrl.dismiss()
                this.expenses = parsed.data
                this.total = parsed.total
                console.log(parsed)
             }else{
                this.loadingctrl.dismiss()
                this.presentToast("Unable to retrieve current Expenses")
                console.log(parsed)
             }
        },
        (error) => {
           console.log(error);

        }
     )
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
}
