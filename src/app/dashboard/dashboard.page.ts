import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ExpenseService } from '../Services/Expense.service';
import { InformationService } from '../Services/Information.service';
import { PersonService } from '../Services/Person.service';
import { ToastController, NavController, LoadingController , MenuController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
// ChartData: ChartDataset[] = [{ data: [], label: 'Expenses'}];
// ChartLabels: Label[];
   public data : any[];
   public expenses: boolean;
   public expenseHeader: string;
   public totalAmnt: any;

  constructor(
     private expense: ExpenseService,
     private toastController: ToastController,
     private navCtrl: NavController,
     private loadingController: LoadingController,
     private menu: MenuController,
     private router: Router,
     private network: Network,
     private info: InformationService,
     private user: PersonService
 ) { }
 //@ViewChild('graph') ElementRef;
   @ViewChild('canvas', {static: false}) canvas: ElementRef;
   // @ViewChild('label', {static: false}) label: ElementRef;
   // @ViewChildren('werey') list: ElementRef;
    ngOnInit() {
      //Check if there is network connection and send the available dat to the backend

     }

  ngAfterViewInit()
  {


  }

  ionViewWillEnter()
  {
      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(
         () => {
          console.log('network connected!');
          let userData = this.info.retrieve();
          this.expense.getExpense(userData.user_token).subscribe(
            (response) => {
               console.log(response)
               let parsed = ( typeof response == 'object') ? response : JSON.parse(response);
               localStorage.setItem("allExpense", parsed);
               if (parsed.status === 1)
               {

                 if (Object.keys(parsed.data).length >= 1)
                 {
                    this.expenseHeader = "Your expenses for the month"
                    this.expenses =  true;
                    this.drawChart(parsed.data)
                 }
               }else{
                  this.presentLoading("Kasala ti box")
               }
            } ,

            (error) => {
               console.log(error)
               this.presentToast("Unable to load data")
            }
         );
         },
         () => {
            console.log("No network available")
            let data = JSON.parse(localStorage.getItem("allExpense"));
            if (data.status === 1)
            {

              if (Object.keys(data.data).length >= 1)
              {
                 this.expenseHeader = "Your expenses for the month"
                 this.expenses =  true;
                 this.drawChart(data.data)
              }
            }else{
               this.presentLoading("Kasala ti box")
            }
         }
      );

      // stop connect watch
      connectSubscription.unsubscribe();

  }
  async presentLoading(message)
	{
	    const loading = await this.loadingController.create({
	      cssClass: 'my-custom-class',
	      message: message,
	      duration: 10000,
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

   onError()
   {
      console.log("Stuff not working")
   }

   drawChart(data)
   {
      //Generates a random color
      const randomHex = () => {
       return "#" + Math.random().toString(16).slice(2, 8);
     }
     //returns the total of the expenses
     function plusTotalAmount(data)
     {
          let info = new Map(Object.entries(data));
          let total = 0;
          info.forEach( element => {
             let addition = 0;
             for (const [key, value] of Object.entries(element))
             {
                 addition += value.amount;
             }
             total += addition;
          });
         return total;
     }
     this.totalAmnt = plusTotalAmount(data)
     // Adds a color property to the given Object
     // returns a an object that cannot be modified
     function addcolor(info)
       {
          let data = new Map(Object.entries(info));
          let edited = {};
          data.forEach(  (element) => {
             // let checkObject = Object.values(element)
             // console.log(Object.entries(element))
             let firstArray = [];
             let categoryObj = [];
             var categoryHeading = "";
             let color = randomHex();

             for (let details of  Object.values(element)) {

                Object.defineProperty(details, 'display', {
                   value: false,
                   writable: true,
                   enumerable: true
               });

               Object.defineProperty(details, 'color', {
                   value: color,
                   writable: true,
                   enumerable: true
               });

               // return newObject
               categoryHeading = details.category_id;
               firstArray.push(details);
               // console.log(categoryHeading)
             }
             categoryObj[categoryHeading] = firstArray;
             // return Object.create(categoryObj);
             Object.defineProperty(edited, categoryHeading, {
               value: firstArray,
               writable: true,
               enumerable: true
             })
             // console.log(Object.create(categoryObj));
             // return Object.freeze(edited);

          });
          return edited
       }

      let canvas = this.canvas.nativeElement;
      // console.log(this.canvas)
      let ctx = canvas.getContext('2d');
       canvas.width = 600
       canvas.height = 500
       // canvas.style.boxShadow = "5px 5px 2px rgba(0,0,0,0.2), -5px 3px 4px rgba(0,0,0,0.2)";
       let totalNetWorth = plusTotalAmount(data);

       let startAngle = 0;
       let radius = 190;
       let cx = canvas.width/2;
       let cy = canvas.height/2;

       const arrayToLoop =new Map(Object.entries(addcolor(data)));
       this.data = Array.from(arrayToLoop.values());
       console.log(this.data)
       arrayToLoop.forEach( info => {
          let color = "";
          let categoryTotal = 0;

         for( let expenseSet of Object.values(info))
         {
            color = expenseSet.color;
            categoryTotal += expenseSet.amount;
         }
          ctx.fillStyle = color;
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#000';
          ctx.beginPath();

          let endAngle = ( (categoryTotal / totalNetWorth) * Math.PI * 2 ) + startAngle;
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, startAngle, endAngle, false);
          ctx.lineTo(cx, cy);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();

          startAngle = endAngle;
          // console.log()
       });
   }

   getAll(item)
   {
      // console.log(item)
      item.forEach(element => {
         if (element.display == true) {
            element.display = false
         }else{
            element.display = true
         }
      });
   }

   createExpense()
   {
      this.router.navigate(['/create-expense']);
   }

   openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  profile()
  {
     this.router.navigate(['/profile'])
  }

  feedback()
  {
       this.router.navigate(['/feedback'])
  }

  signout()
  {
     this.presentLoading("Logging out user.....");
     const userData = this.info.retrieve();
     const data = {user_id: userData.user_token};
     this.user.signout(data).subscribe(
        (response) => {
           this.loadingController.dismiss();
           this.presentToast("User logged out.");
           this.info.destroy();
           // Destroy any other other saved data in the localStorage
           localStorage.clear();
           this.router.navigate(['/home']);
        },

        (error) => {
           this.loadingController.dismiss();
           this.presentToast("Unable to log out.");
        }
     )
  }
}
