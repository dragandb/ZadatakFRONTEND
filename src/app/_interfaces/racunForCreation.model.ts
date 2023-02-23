import { Stavka } from "./stavka.model";

export interface RacunForCreation{
    broj: string;
    datum: string;
    napomena: string;
    ukupno: string;
    ukupnoPopust: string;
    total: string;

    stavke?: Stavka[];
    kupacId?: string;
  }