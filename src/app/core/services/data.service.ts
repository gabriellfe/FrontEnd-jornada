import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public email!: string;

  constructor() { }

  setEmail(email: string){
    this.email = email;
  }
  
  getEmail(){
    return this.email;
  }
}
