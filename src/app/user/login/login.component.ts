import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authservice:AuthService) { }

  ngOnInit() {
  }
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authservice.login(userName, password);

      // Navigate to the Product List page after log in.
      if (this.authservice.redirecturl) {
        this.router.navigateByUrl(this.authservice.redirecturl);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      console.log('Please enter a user name and password.');
    }
  }


}
