import { Stavka } from "./stavka.model";

export interface ProizvodForCreation{
    sifra: string;
    naziv: string;
    jedinica_mjere: string;
    cijena: string;
    stanje: string;

    stavke?: Stavka[];
  }