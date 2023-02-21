import { Racun } from "./racun.model";

export interface KupacForUpdate{
    sifra: string;
    naziv: string;
    adresa: string;
    mjesto: string;

    racuni?: Racun[];
  }