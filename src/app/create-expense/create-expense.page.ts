import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { ToastController, NavController, LoadingController  } from '@ionic/angular';
import { InformationService } from '../Services/Information.service';
import { ExpenseService } from '../Services/Expense.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
})
export class CreateExpensePage implements OnInit {

  constructor(
     private router: Router,
     private toastController: ToastController,
     private loadingController: LoadingController,
     private navCtrll: NavController,
     private info: InformationService,
     private expense: ExpenseService,
     private network: Network
 ) { }

  public amount: any;
  public category: any;
  public categories: any[]
  ngOnInit() {
     this.categories = [ "Airtime",
      "Books",
      "Chill",
      "Clothing/Accessories",
      "Data",
      "Giveaway",
      'Inventories',
      "Investment",
      "Savings",
      "Software",
      "Transportation"]
  }

  recordExpense()
  {

     if (this.amount.length < 2 || this.category.length < 4) {
        this.presentToast("Oops!, seems there is a problem with your internet connection", 6000);
     }else{
         this.presentLoading("Logging expense......")
         // check if there is internet and then log it || if not store the data in the localStorage
         const data = {amount: this.amount, category: this.category};
         let connectSubscription = this.network.onConnect().subscribe(() => {
           console.log('network connected!');
           this.expense.createExpense(data).subscribe(
             (response) => {
                let parsed = (typeof response == 'object') ? response : JSON.parse(response);
                if (parsed.status == 1) {
                   this.presentToast(parsed.message)
                   setTimeout(() => {
                      this.router.navigate(['/dashboard']);
                   }, 5000)
                }else{
                   this.presentToast(parsed.message)
                }
             },
             (error) => {
                this.presentToast(error);
             }
          )
         },
         (error) => {
            console.log(error)
            this.presentToast("Oops! seems you do not have an internet connection. The expense would be updated when you have access to internet connection.");
            this.presentLoading("Saving expense....")
            //check if there is a data initial data then add to it else create a new Data
            let expenses = localStorage.getItem("expenses");
            if (expenses == null || expenses == undefined || expenses === "")
            {
               // store in he local storage
               localStorage.setItem("expenses", JSON.stringify([data]));
               this.loadingController.dismiss()
               this.presentToast("Expenses saved")
               this.router.navigate(['/dashboard'])
            }else{
               //add to the initial one
               let initialData = JSON.parse(localStorage.getItem("expenses"));
               initialData.push(data);
               localStorage.setItem("expenses", initialData)
               this.loadingController.dismiss()
               this.presentToast("Expenses saved")
               this.router.navigate(['/dashboard'])
            }
         }
    );
         // stop connect watch
         connectSubscription.unsubscribe();
     }
  }

  back()
  {
     this.router.navigate(['/dashboard']);
  }

  async presentLoading(message)
  {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: message,
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
}
