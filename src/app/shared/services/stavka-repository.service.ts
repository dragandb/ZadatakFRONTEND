import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stavka } from 'src/app/_interfaces/stavka.model';
import { StavkaForCreation } from 'src/app/_interfaces/stavkaForCreation.model';
import { StavkaForUpdate } from 'src/app/_interfaces/stavkaForUpdate.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class StavkaRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getStavka = (route: string) => {
    return this.http.get<Stavka>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public getStavkaList = (route: string) => {
    return this.http.get<Stavka[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  public createStavka = (route: string, stavka: StavkaForCreation) => {
    return this.http.post<Stavka>(this.createCompleteRoute(route, this.envUrl.urlAddress), stavka, this.generateHeaders());
  }
  public updateStavka = (route: string, stavka: StavkaForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), stavka, this.generateHeaders());
  }
  public deleteStavka = (route: string) => {
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