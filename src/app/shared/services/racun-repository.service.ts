import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { Racun } from 'src/app/_interfaces/racun.model';
import { RacunForCreation } from 'src/app/_interfaces/racunForCreation.model';
import { RacunForUpdate } from 'src/app/_interfaces/racunForUpdate.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RacunRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getRacun = (route: string) => {
    return this.http.get<Racun>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getRacunList = (route: string) => {
    return this.http.get<Racun[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createRacun = (route: string, racun: RacunForCreation) => {
    return this.http.post<Racun>(this.createCompleteRoute(route, this.envUrl.urlAddress), racun, this.generateHeaders());
  }
  public updateRacun = (route: string, racun: RacunForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), racun, this.generateHeaders());
  }
  public deleteRacun = (route: string) => {
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


  public getKupacList = (route: string) => {
    return this.http.get<Kupac[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getProizvodList = (route: string) => {
    return this.http.get<Proizvod[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getProizvod = (route: any) => {
    return this.http.get('https://localhost:7186/api/Proizvod/'+route);
  }
  public getKupac = (route: string) => {
    return this.http.get('https://localhost:7186/api/Kupac/'+route);
  }
}
