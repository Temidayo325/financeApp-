import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../Service/expense.service';
import { InformationService } from '../Service/information.service';
import { ToastController, LoadingController, ModalController, AlertController   } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

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
     public loadingctrl: LoadingController,
     private modal: ModalController,
     private alert: AlertController
 ) {}
  public name: any;
  public isOpen: boolean = false
  public expenses = "00.00";
  public income = "00.00";
  public categories: any
  public userData = JSON.parse(localStorage.getItem("user"));
  public dateValue1 : string = ''
  public dateValue2: string = ''
  public disabled: boolean = false
  async ionViewWillEnter()
  {
     this.getFirstName(this.userData.name)
     this.getOverview()
  }
  async getOverview()
  {
      await this.presentLoading("Retrieving data...");
      this.expense.getExpenseOverview(this.userData.user_id, localStorage.getItem("token")).subscribe(
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
  chooseFilter()
  {
     this.presentAlertRadio()
  }
  showModal()
  {
       this.isOpen = true
       this.disabled = false
  }
  closeModal()
  {
       this.isOpen = false
  }
  setDate(value: string) {
    // return format(parseISO(value), 'yyyy-MM-ddTHH:mm:ss');
    if (this.dateValue1 == '' || this.dateValue1 == undefined) {
         this.dateValue1 = format(parseISO(value), 'yyyy-MM-ddTHH:mm:ss')
         this.presentToast("Start date chosen")
         this.disabled = true
         setTimeout(() => {
              this.disabled = false
              this.presentToast("Choose end date")
         }, 2000)
    }else{
         this.dateValue2 = format(parseISO(value), 'yyyy-MM-ddTHH:mm:ss')
          this.presentToast("End date chosen")
          this.disabled = true
    }
  }
  resetDate()
  {
       this.dateValue1 = ''
       this.dateValue2 = ''
       this.disabled = false
  }
  async getSpecificDatesExpense()
  {
       await this.presentLoading("Retrieving data...");
      this.expense.getTwoDatesExpenseOverview({user_id: this.userData.user_id, date: this.dateValue1, date2: this.dateValue2}, localStorage.getItem("token")).subscribe(
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
   async presentAlertRadio() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Choose Expense/Income data',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Current month',
          value: 'current',
          handler: () => {
            console.log('Current month selected');
            this.alert.dismiss()
            this.getOverview()
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Past month',
          value: 'past',
          handler: () => {
            console.log('Past month selected')
            this.alert.dismiss()
            this.getPastMonthData()
          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Select time frame',
          value: 'timeframe',
          handler: () => {
            console.log('Special time frame selected')
            this.alert.dismiss()
            this.showModal()
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
   async getPastMonthData()
   {
        await this.presentLoading("Retrieving specified data...")
       this.expense.getPastExpenseOverview(this.userData.user_id, localStorage.getItem("token")).subscribe(
          response => {
               let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
               if (parsed.status == 0) {
                  this.loadingctrl.dismiss()
                  this.presentToast(parsed.message)
                  console.log(parsed)
               }else if (parsed.status == 1) {
                  this.loadingctrl.dismiss()
                  this.expenses = parsed.expenses
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
      this.router.navigate(['/tabs/tab2'])
   }
   viewIncome()
   {
      this.router.navigate(['/tabs/tab3'])
   }
}
