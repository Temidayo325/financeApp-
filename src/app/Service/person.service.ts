import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import {  HttpHeaders } from '@angular/common/http';
import { Observable, of, from, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
     private http: HTTP
 ) { }

 public baseUrl = "https://expensex.lumina.com.ng/api/";
 public headers = {'Content-Type': 'application/json' , 'Accept': 'application/json'};
public httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'}),
 }

OnInit()
   {
       // this.baseUrl = "https://expensex.lumina.com.ng/api/";
       // this.headers = {'Content-Type': 'application/json' , 'Accept': 'application/json'};
       // this.httpHeader = {
       //    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'}),
       // }
   }

login(user: object): Observable<any>
  {

    let value = this.http.post(this.baseUrl+"login", user, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then(data => {return data.data})
    .catch(error => {return error});
     return from(value)
  }

verifyCode(user: object): Observable<any>
   {
       let value = this.http.post(this.baseUrl+"verifyUser", user, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
       .then(data => {return data.data})
       .catch(error => {return error});
        return from(value)
   }
Signup(user: object): Observable<any>
   {
      let value = this.http.post(this.baseUrl+"register", user, this.headers)
      .then(data => { return data.data })
      .catch(error => { return error })
       return from(value)
   }
 ResetPassword(email: string): Observable<any>
 {
      let value = this.http.post(this.baseUrl+"reset", email, this.headers)
      .then(data => { return data.data })
      .catch(error => { return error })
       return from(value)
 }
}
