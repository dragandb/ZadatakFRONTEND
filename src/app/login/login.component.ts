import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../_interfaces/userLogin.model';
import { UserManagerResponse } from '../_interfaces/userManagerResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  credentials: UserLogin = {email:'', password:''};

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<UserManagerResponse>("https://localhost:7186/api/Auth/Login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: UserManagerResponse) => {
          const token = response.message;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
  redirectToHome = () => {
    this.router.navigate(['/home']);
  }
}