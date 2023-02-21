import { Stavka } from "./stavka.model";

export interface RacunForCreation{
    broj: string;
    datum: string;
    napomena: string;

    stavke?: Stavka[];
    kupacId?: string;
  }