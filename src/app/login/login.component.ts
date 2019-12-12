import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private readonly router: Router, private readonly auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    let username = event.target.querySelector('#username').value;
    let password = event.target.querySelector('#password').value;

    if (username != '' && password != '') {
      this.auth.getUserDetails(username, password).subscribe(data => {
        if (data && data['User']) {
          if (username == data['User']['admin']['username'] && password == data['User']['admin']['password']) {
            this.router.navigate(['admin']);
            this.auth.setLoggedIn(true);
          } else{
            this.message = 'Invalid credentials';
          }
        } else {
          this.message = 'Error on service';
        }
      }, (error: HttpErrorResponse)=>{

      })
    } else {
      this.message = 'Provide Username and Password';
    }

  }

  navToAdmin() {
    this.router.navigate(['admin']);
  }
}
