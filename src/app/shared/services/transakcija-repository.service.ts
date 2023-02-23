import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { Stavka } from 'src/app/_interfaces/stavka.model';
import { StavkaForCreation } from 'src/app/_interfaces/stavkaForCreation.model';
import { StavkaForUpdate } from 'src/app/_interfaces/stavkaForUpdate.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class TransakcijaRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  
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



  public getKupacList() {
    return this.http.get('https://localhost:7186/api/Kupac');
  }
  public getKupac = (route: string) => {
    return this.http.get('https://localhost:7186/api/Kupac/'+route);
  }  
  public getKupacBySifra = (route: string) => {
    return this.http.get<Kupac>('https://localhost:7186/api/Kupac/GetKupacBySifra/'+route);
  }  
  public getKupacByNaziv = (route: string) => {
    return this.http.get<Kupac>('https://localhost:7186/api/Kupac/GetKupacByNaziv/'+route);
  }



  public getProizvodList() {
    return this.http.get<Proizvod[]>('https://localhost:7186/api/Proizvod');
  }
  public getProizvod = (route: any) => {
    return this.http.get('https://localhost:7186/api/Proizvod/'+route);
  }
  public getProizvodBySifra = (route: any) => {
    return this.http.get<Proizvod>('https://localhost:7186/api/Proizvod/GetProizvodBySifra/'+route);
  }
  public getProizvodByNaziv = (route: any) => {
    return this.http.get<Proizvod>('https://localhost:7186/api/Proizvod/GetProizvodByNaziv/'+route);
  }



  public getRacunList() {
    return this.http.get('https://localhost:7186/api/Racun');
  }  
  public getRacun = (racunno: any) => {
    return this.http.get('https://localhost:7186/api/Racun/'+racunno);
  }
  public createRacun = (noviracun: any) => {
    return this.http.post('https://localhost:7186/api/Racun', noviracun);
  }
  public deleteRacun = (racunno: any) => {
    return this.http.delete('https://localhost:7186/api/Racun/'+racunno);
  }


  public getStavka = (racunno: any) => {
    return this.http.get('https://localhost:7186/api/Stavka/'+racunno);
  }
  
}