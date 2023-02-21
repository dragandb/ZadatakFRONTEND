import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { ProizvodForCreation } from 'src/app/_interfaces/proizvodForCreation.model';
import { ProizvodForUpdate } from 'src/app/_interfaces/proizvodForUpdate.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProizvodRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getProizvod = (route: string) => {
    return this.http.get<Proizvod>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getProizvodList = (route: string) => {
    return this.http.get<Proizvod[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createProizvod = (route: string, proizvod: ProizvodForCreation) => {
    return this.http.post<Proizvod>(this.createCompleteRoute(route, this.envUrl.urlAddress), proizvod, this.generateHeaders());
  }
  public updateProizvod = (route: string, proizvod: ProizvodForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), proizvod, this.generateHeaders());
  }
  public deleteProizvod = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
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
