import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Observable, from, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
      private http: HTTP
 ) { }
 public baseUrl = "https://expensex.lumina.com.ng/api/";

  addIncome(details: object, token: string): Observable<any>
  {
     let value = this.http.post(this.baseUrl+'createIncome', details , {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
     .then( data => {return data.data})
     .catch(error => {return error});
     return from(value)
  }
  getSources(token: string):Observable<any>
  {
     let value = this.http.get(this.baseUrl+'getIncomeSources', {}, {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
     .then( data => {return data.data})
     .catch(error => {return error});
     return from(value)
  }
  getRevenue(user_id: string, token: string):Observable<any>
  {
     let value = this.http.get(this.baseUrl+'readIncome', {user_id: user_id}, {'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
     .then( data => {return data.data})
     .catch(error => {return error});
     return from(value)
  }
}
