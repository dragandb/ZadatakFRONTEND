export interface Stavka{
    id: string;
    kolicina: string;
    cijena: string;
    popust: string;
    iznos_popusta: string;
    vrijednost: string;

    proizvodId?: string;
    racunId?: string;
  }