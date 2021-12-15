// import { Injectable } from '@angular/core';
// import {  HttpHeaders  } from '@angular/common/http';
// import { Observable, of, from, defer } from 'rxjs';
// import { catchError, share } from 'rxjs/operators';
// import { HTTP } from '@ionic-native/http/ngx';
//
// export class User {
//   email: string;
//   password: string;
// }
// export class NewUser {
// 	name: string;
// 	email: string;
// 	password: string;
// }
// export class recoveryEmail {
// 	email: string;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//
//   constructor(
//      private http: HTTP
//  ) { }
//
//  baseUrl: "https://expensex.lumina.com.ng/api/";
//
//  httpHeader = {
//    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json'}),
//  }
//
//  // private handleError<T>(operation = 'operation', result?: T) {
//  //     return (error: any): Observable<T> => {
//  //      console.error(error);
//  //      console.log(`${operation} failed: ${error.message}`);
//  //      return of(result as T);
//  //     };
//  // }
//
//  // login(user: User): Observable<any>
//  // {
//  //   return this.http.post(this.baseUrl+'login', user, this.httpHeader)
//  //     .pipe(
//  //        catchError(this.handleError<User>('Unable to login'))
//  //     );
//  // }
//
//  signup(user): Observable<any>
//  {
//    return defer( () => from(this.http.post(this.baseUrl+'register', user, this.httpHeader)
//      )
//      .pipe(
//         share()
//      ));
//   }
//
//   // recoverPassword(user: recoveryEmail): Observable<any>
//   // {
//   //   return this.http.post(this.baseUrl+'reset', user, this.httpHeader)
//   //     .pipe(
//   //        catchError(this.handleError<NewUser>('Account unavailable'))
//   //     );
//   //  }
//
//    // verifyCode(body: object):Observable<any>
//    // {
//    //    return this.http.post(this.baseUrl+'reset', body, this.httpHeader)
//    //      .pipe(
//    //         catchError(this.handleError<NewUser>('Account unavailable'))
//    //      );
//    // }
// }
