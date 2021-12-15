import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {  HttpHeaders  } from '@angular/common/http';
import { Observable, from, defer } from 'rxjs';
// import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { share, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
     private http: HTTP
 ) { }

  baseUrl: "https://expensex.lumina.com.ng/api/";

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json'}),
  }

  getExpense(user_id: string): Observable<any>
  {
     let value = this.http.get('https://expensex.lumina.com.ng/api/ExpenseWithCash', user_id , {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then( data => {return data.data})
    .catch(error => {return error});
     return from(value)
  }

  createExpense(data):Observable<any>
  {
      let value = this.http.post('https://expensex.lumina.com.ng/api/ExpenseWithCash', data, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
      .then( data => {return data.data})
      .catch(error => {return error});
        return from(value)
  }
}
