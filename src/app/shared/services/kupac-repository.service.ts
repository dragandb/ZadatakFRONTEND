import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { KupacForCreation } from 'src/app/_interfaces/kupacForCreation.model';
import { KupacForUpdate } from 'src/app/_interfaces/kupacForUpdate.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class KupacRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getKupac = (route: string) => {
    return this.http.get<Kupac>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getKupacList = (route: string) => {
    return this.http.get<Kupac[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createKupac = (route: string, kupac: KupacForCreation) => {
    return this.http.post<Kupac>(this.createCompleteRoute(route, this.envUrl.urlAddress), kupac, this.generateHeaders());
  }
  public updateKupac = (route: string, kupac: KupacForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), kupac, this.generateHeaders());
  }
  public deleteKupac = (route: string) => {
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
