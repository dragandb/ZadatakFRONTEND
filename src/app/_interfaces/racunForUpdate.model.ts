import { Stavka } from "./stavka.model";

export interface RacunForUpdate{
    broj: string;
    datum: string;
    napomena: string;

    stavke?: Stavka[];
    kupacId?: string;
  }