import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor() { }

  data: any;

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
