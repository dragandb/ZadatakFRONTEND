import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isCollapsed: boolean = false;
  
  
  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
  }
  
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
  if (token && !this.jwtHelper.isTokenExpired(token)){
    return true;
  }
  return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }
}


