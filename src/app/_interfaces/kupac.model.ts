import { Racun } from "./racun.model";

export interface Kupac{
    id: string;
    sifra: string;
    naziv: string;
    adresa: string;
    mjesto: string;

    racuni?: Racun[];
  }