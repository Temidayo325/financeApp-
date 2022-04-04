import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Observable, from, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(
     private http: HTTP
 ) { }
   public data: any;
public baseUrl = "https://expensex.pentadcrown.com.ng/api/";
   store(info)
   {
       this.data = info;
   }

   retrieve()
   {
       return this.data;
   }

   destroy()
   {
        this.data = null;
   }

}
