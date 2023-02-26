import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/_interfaces/userRegister.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  

  public createUser = (route: string, user: UserRegister) => {
    return this.http.post<UserRegister>(this.createCompleteRoute(route, this.envUrl.urlAddress), user, this.generateHeaders());
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}


