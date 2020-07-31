import { Injectable } from '@angular/core';
import { User } from '../UserDashboard/Maindashboard/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 redirecturl='http://127.0.0.1:3000/api/v1/users/login';
  constructor() { }
currentuser:User;
  login(userName: string, password: string): void {
    if (!userName || !password) {
      console.log('Please enter your userName and password');
      return;
    }
    console.log(`User: ${this.currentuser.name} logged in`);
  }

  logout(): void {
    this.currentuser = null;
  }
}
