import { Injectable, OnInit} from '@angular/core';
import {  HttpHeaders,  HttpClient } from '@angular/common/http';
import { Observable, of, from, defer } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
// import { HTTP } from '@ionic-native/http/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
     private http: HTTP,
     private normHttp: HttpClient
 ) { }

 baseUrl: string;
 headers: object;
 httpHeader: any;

 ngOnInit()
 {
    this.baseUrl = "https://expensex.lumina.com.ng/api/";
    this.headers = {'Content-Type': 'application/json' , 'Accept': 'application/json'};
    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'}),
    }
 }

  Signup(user: object): Observable<any>
  {
     let value = this.http.post("https://expensex.lumina.com.ng/api/register", user, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
     .then(data => { return data.data })
     .catch(error => { return error });
      return from(value)
  }
  verifyCode(user: object): Observable<any>
  {
     let value = this.http.post("https://expensex.lumina.com.ng/api/verifyUser", user, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
     .then(data => {return data.data})
     .catch(error => {return error});
      return from(value)
  }

  login(user: object): Observable<any>
  {

    let value = this.http.post("https://expensex.lumina.com.ng/api/login", user, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then(data => {return data.data})
    .catch(error => {return error});
     return from(value)
  }

  recoverPassword(email: string): Observable<any>
  {
   let value = this.http.post('https://expensex.lumina.com.ng/api/reset', email, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
   .then(data => {return data.data})
   .catch(error => {return error});
     return from(value)
  }

  submitFeedback(data: object): Observable<any>
  {
    let value = this.http.post('https://expensex.lumina.com.ng/api/feedback', data, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then(data => {return data.data})
    .catch(error => {return error});
      return from(value)
  }

  updateInfo(data: object): Observable<any>
  {
    let value = this.http.post('https://expensex.lumina.com.ng/api/updateInfo', data, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then( data => {return data.data})
    .catch(error => {return error});
      return from(value)
  }

  signout(data: object): Observable<any>
  {
    let value = this.http.post('https://expensex.lumina.com.ng/api/signout', data, {'Content-Type': 'application/json' , 'Accept': 'application/json'})
    .then(data => { return data.data})
    .catch( error => {return error});
      return from(value)
  }
}
