import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './admin/model/User.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');

  constructor(private readonly http: HttpClient) { }

  getUserDetails(username, password): Observable<Object> {
    return this.http.get<User>('./mock/user.json', username);
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', value.toString());
  }

  // clearLoggedIn(value: boolean) {
  //   this.loggedInStatus = value;
  //   sessionStorage.removeItem('loggedIn');
  //   sessionStorage.setItem('loggedIn', value.toString());
  // }
  get loggedIn() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }
}
