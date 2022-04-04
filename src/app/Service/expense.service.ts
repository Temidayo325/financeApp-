import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Observable, from, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
     private http: HTTP
 ) { }
public baseUrl = "https://expensex.pentadcrown.com.ng/api/";

  getExpenseOverview(user_id: string, token: string): Observable<any>
   {
      let value = this.http.get(this.baseUrl+'getExpenseOverview', {user_id: user_id} , {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
     .then( data => {return data.data})
     .catch(error => {return error});
      return from(value)
   }
   addExpense(details: object, token: string): Observable<any>
    {
      let value = this.http.post(this.baseUrl+'ExpenseWithCash', details , {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
      .then( data => {return data.data})
      .catch(error => {return error});
      return from(value)
    }
    getUserExpense(user_id: string, token: string):Observable<any>
    {
      let value = this.http.get(this.baseUrl+'getExpense', {user_id: user_id} , {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
     .then( data => {return data.data})
     .catch(error => {return error});
      return from(value)
    }
}
