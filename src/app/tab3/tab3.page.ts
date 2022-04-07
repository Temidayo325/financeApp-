import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { PersonService } from '../Service/person.service';
import { IncomeService } from '../Service/income.service';
import { ToastController, LoadingController  } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
     private router: Router,
     // private person: PersonService,
     private revenue: IncomeService,
     private toastCtrl: ToastController,
     private loadingctrl: LoadingController
   ) {}
   public income: any
   public total = "00.00"
   public currentActive = "background:white;color:#004481;border:solid thin #004481;"
   public active = {current: '', past: '', specific: ''}
   public isOpen: boolean = false
   public dateValue1 : string = ''
   public dateValue2: string = ''
   public disabled: boolean = false

   async ionViewWillEnter()
   {
      this.getCurrent()

   }
   resetActive()
   {
        this.active.current = ''
        this.active.past = ''
        this.active.specific = ''
   }
   showModal()
   {
       this.isOpen = true
       this.disabled = false
       this.resetActive()
       this.active.specific = this.currentActive
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
    async getCurrent()
    {
         this.resetActive()
         this.active.current = this.currentActive
         await this.presentLoading("Retrieving your income....")
         const userData = JSON.parse(localStorage.getItem("user"))
         this.revenue.getRevenue(userData.user_id, localStorage.getItem("token")).subscribe(
           response => {
                let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                console.log(parsed)
                this.presentToast(parsed.message)
                if (parsed.status == 0) {
                   this.loadingctrl.dismiss()
                   this.presentToast(parsed.message)
                   console.log(parsed)
                }else if (parsed.status == 1) {
                   this.loadingctrl.dismiss()
                   this.income = parsed.data
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
    ClickCurrent()
    {
         this. getCurrent()
    }
    async ClickPast()
    {
         this.resetActive()
         this.active.past = this.currentActive
         await this.presentLoading("Retrieving your income....")
         const userData = JSON.parse(localStorage.getItem("user"))
         this.revenue.getPastMonthRevenue(userData.user_id, localStorage.getItem("token")).subscribe(
           response => {
                let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                console.log(parsed)
                this.presentToast(parsed.message)
                if (parsed.status == 0) {
                   this.loadingctrl.dismiss()
                   this.presentToast(parsed.message)
                   console.log(parsed)
                }else if (parsed.status == 1) {
                   this.loadingctrl.dismiss()
                   this.income = parsed.data
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
    async ClickSpecific()
    {
         this.resetActive()
         this.active.specific = this.currentActive
         await this.presentLoading("Retrieving your income....")
         const userData = JSON.parse(localStorage.getItem("user"))
         this.revenue.getTwoDatesRevenue({user_id: userData.user_id, date: this.dateValue1, date2: this.dateValue2}, localStorage.getItem("token")).subscribe(
           response => {
                let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
                console.log(parsed)
                this.presentToast(parsed.message)
                if (parsed.status == 0) {
                   this.loadingctrl.dismiss()
                   this.presentToast(parsed.message)
                   console.log(parsed)
                }else if (parsed.status == 1) {
                   this.loadingctrl.dismiss()
                   this.income = parsed.data
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

    addIncome()
    {
      this.router.navigate(['/create-income'])
    }
    menu()
    {
         this.presentToast("in a bit")
    }
}
