import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransakcijaRepositoryService } from 'src/app/shared/services/transakcija-repository.service';

@Component({
  selector: 'app-transakcija-create',
  templateUrl: './transakcija-create.component.html',
  styleUrls: ['./transakcija-create.component.css']
})
export class TransakcijaCreateComponent implements OnInit {

  constructor(private builder:FormBuilder, private repository: TransakcijaRepositoryService, private router: Router) { }

  proizvodForm: FormGroup;
  transakcijaDetail !: FormArray<any>;
  transakcijaProizvod !: FormGroup<any>;

  masterKupac: any;
  masterProizvod: any;

  ngOnInit(): void {
    this.GetKupacAll();
    this.GetProizvodAll();
  }

  transakcijaForm=this.builder.group({
    broj:this.builder.control('',Validators.required),
    kupacId:this.builder.control('',Validators.required),
    naziv:this.builder.control(''),
    adresa:this.builder.control(''),
    mjesto:this.builder.control(''),
    datum:this.builder.control(''),
    napomena:this.builder.control(''),
    vrijednost:this.builder.control({value:0,disabled:true}),
    popust:this.builder.control({value:0,disabled:true}),
    ukupnaVrijednost:this.builder.control({value:0,disabled:true}),
    detalji:this.builder.array([]),
  });

  createTransakcija(){
    console.log(this.transakcijaForm.value);
  }

  addNewProduct(){
    this.transakcijaDetail = this.transakcijaForm.get("detalji") as FormArray;
    this.transakcijaDetail.push(this.generateRow());
  }

  get invProizvodi(){
    return this.transakcijaForm.get("detalji") as FormArray;
  }

  generateRow(){
    return this.builder.group({
      sifra: this.builder.control(''),
      naziv: this.builder.control(''),
      cijena: this.builder.control(0),
      kolicina: this.builder.control(1),
      iznos: this.builder.control({value:0,disabled:true}),
      popust: this.builder.control(0),
      iznosPopusta: this.builder.control({value:0,disabled:true}),
      ukupno: this.builder.control({value:0,disabled:true})
    });
  }

  GetKupacAll(){
    this.repository.getKupacList().subscribe(res=>{
      this.masterKupac=res;
    })
  }

  GetProizvodAll(){
    this.repository.getProizvodList().subscribe(res=>{
      this.masterProizvod=res;
    })
  }

  changeKupac() {
    let kupacId=this.transakcijaForm.get("kupacId")?.value;
    this.repository.getKupac(kupacId).subscribe(res => {
      let kupdata: any;
      kupdata = res;
      if(kupdata!=null){
        this.transakcijaForm.get("adresa")?.setValue(kupdata.adresa +', ' + kupdata.mjesto);
        this.transakcijaForm.get("naziv")?.setValue(kupdata.naziv);
      }
    })
  }

  changeProizvod(index:any){
    this.transakcijaDetail =this.transakcijaForm.get("detalji") as FormArray;
    this.transakcijaProizvod=this.transakcijaDetail.at(index) as FormGroup;
    let proizvodId=this.transakcijaProizvod.get("naziv")?.value;
    this.repository.getProizvod(proizvodId).subscribe(res => {
      let prodata: any;
      prodata = res;
      if(prodata!=null){
        this.transakcijaProizvod.get("sifra")?.setValue(prodata.sifra);
        this.transakcijaProizvod.get("cijena")?.setValue(prodata.cijena);
        this.ItemCalculation(index);
      }
    })
  }

  ItemCalculation(index:any){
    this.transakcijaDetail =this.transakcijaForm.get("detalji") as FormArray;
    this.transakcijaProizvod=this.transakcijaDetail.at(index) as FormGroup;
    let cijena = this.transakcijaProizvod.get("cijena")?.value;
    let kolicina = this.transakcijaProizvod.get("kolicina")?.value;
    let iznos = cijena*kolicina;
    this.transakcijaProizvod.get("iznos")?.setValue(iznos);
    let popust = this.transakcijaProizvod.get("popust")?.value;
    let popustUkupno = popust/100*iznos;
    this.transakcijaProizvod.get("iznosPopusta")?.setValue(popustUkupno);
    let ukupno = iznos-popustUkupno;
    this.transakcijaProizvod.get("ukupno")?.setValue(ukupno);

    this.SummaryCalculation();
  }

  SummaryCalculation(){
    let array=this.transakcijaForm.getRawValue().detalji;
    let vrijednost=0
    array.forEach((x:any)=>{
      vrijednost=vrijednost+x.iznos;
    });
    let popustTotal=0
    array.forEach((x:any)=>{
      popustTotal=popustTotal+x.iznosPopusta;
    });

    let ukupnaVrijednost=vrijednost-popustTotal;

    this.transakcijaForm.get("vrijednost")?.setValue(vrijednost);
    this.transakcijaForm.get("popust")?.setValue(popustTotal);
    this.transakcijaForm.get("ukupnaVrijednost")?.setValue(ukupnaVrijednost);
  }

}