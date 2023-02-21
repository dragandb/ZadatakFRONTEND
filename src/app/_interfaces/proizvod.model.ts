import { Stavka } from "./stavka.model";

export interface Proizvod{
    id: string;
    sifra: string;
    naziv: string;
    jedinica_mjere: string;
    cijena: string;
    stanje: string;

    stavke?: Stavka[];
  }