import { Stavka } from "./stavka.model";

export interface ProizvodForUpdate{
    sifra: string;
    naziv: string;
    jedinica_mjere: string;
    cijena: string;
    stanje: string;

    stavke?: Stavka[];
  }