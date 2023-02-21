import { Racun } from "./racun.model";

export interface KupacForCreation{
    sifra: string;
    naziv: string;
    adresa: string;
    mjesto: string;

    racuni?: Racun[];
  }