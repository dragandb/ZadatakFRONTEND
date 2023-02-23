import { Stavka } from "./stavka.model";

export interface Racun{
    id: string;
    broj: string;
    datum: string;
    napomena: string;
    ukupno: string;
    popustUkupno: string;
    total: string;

    stavke?: Stavka[];
    kupacId?: string;
  }