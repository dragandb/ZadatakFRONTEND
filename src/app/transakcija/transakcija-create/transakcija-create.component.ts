import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { TransakcijaRepositoryService } from 'src/app/shared/services/transakcija-repository.service';
import { Racun } from 'src/app/_interfaces/racun.model';

@Component({
  selector: 'app-transakcija-create',
  templateUrl: './transakcija-create.component.html',
  styleUrls: ['./transakcija-create.component.css']
})
export class TransakcijaCreateComponent implements OnInit {
  errorHandler: any;

  constructor(private builder:FormBuilder, private modal: BsModalService, private repository: TransakcijaRepositoryService, private router: Router) { }

  proizvodForm: FormGroup;
  stavkaDetail !: FormArray<any>;
  stavkaProizvod !: FormGroup<any>;

  masterKupac: any;
  masterProizvod: any;

  errorMessage: string = '';
  bsModalRef?: BsModalRef;

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
    ukupno:this.builder.control({value:0,disabled:true}),
    ukupnoPopust:this.builder.control({value:0,disabled:true}),
    total:this.builder.control({value:0,disabled:true}),
    stavke:this.builder.array([]),
  });

  createTransakcijaSvi(){
    console.log(this.transakcijaForm.value);
  }

  validateControl = (controlName: string) => {
    if (this.transakcijaForm.get(controlName).invalid && this.transakcijaForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.transakcijaForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createTransakcija() {
    if (this.transakcijaForm.valid)
      this.repository.createRacun(this.transakcijaForm.getRawValue())
      .subscribe({
        next: (rac: Racun) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Racun: ${rac.broj} created successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTransakcijaList());
        },
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      })
  }
    
  






  addNewProduct(){
    this.stavkaDetail = this.transakcijaForm.get("stavke") as FormArray;
    this.stavkaDetail.push(this.generateRow());
  }

  get invProizvodi(){
    return this.transakcijaForm.get("stavke") as FormArray;
  }

  generateRow(){
    return this.builder.group({
      racunId: this.builder.control(''),
      proizvodId: this.builder.control('', Validators.required),
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
    this.stavkaDetail =this.transakcijaForm.get("stavke") as FormArray;
    this.stavkaProizvod=this.stavkaDetail.at(index) as FormGroup;
    let proizvodId=this.stavkaProizvod.get("proizvodId")?.value;
    this.repository.getProizvod(proizvodId).subscribe(res => {
      let prodata: any;
      prodata = res;
      if(prodata!=null){
        this.stavkaProizvod.get("sifra")?.setValue(prodata.sifra);
        this.stavkaProizvod.get("cijena")?.setValue(prodata.cijena);
        this.ItemCalculation(index);
      }
    })
  }

  ItemCalculation(index:any){
    this.stavkaDetail =this.transakcijaForm.get("stavke") as FormArray;
    this.stavkaProizvod=this.stavkaDetail.at(index) as FormGroup;
    let cijena = this.stavkaProizvod.get("cijena")?.value;
    let kolicina = this.stavkaProizvod.get("kolicina")?.value;
    let iznos = cijena*kolicina;
    this.stavkaProizvod.get("iznos")?.setValue(iznos);
    let popust = this.stavkaProizvod.get("popust")?.value;
    let popustUkupno = popust/100*iznos;
    this.stavkaProizvod.get("iznosPopusta")?.setValue(popustUkupno);
    let ukupno = iznos-popustUkupno;
    this.stavkaProizvod.get("ukupno")?.setValue(ukupno);

    this.SummaryCalculation();
  }

  SummaryCalculation(){
    let array=this.transakcijaForm.getRawValue().stavke;
    let vrijednost=0
    array.forEach((x:any)=>{
      vrijednost=vrijednost+x.iznos;
    });
    let popustTotal=0
    array.forEach((x:any)=>{
      popustTotal=popustTotal+x.iznosPopusta;
    });

    let ukupnaVrijednost=vrijednost-popustTotal;

    this.transakcijaForm.get("ukupno")?.setValue(vrijednost);
    this.transakcijaForm.get("ukupnoPopust")?.setValue(popustTotal);
    this.transakcijaForm.get("total")?.setValue(ukupnaVrijednost);
  }

  redirectToTransakcijaList = () => {
    this.router.navigate(['/transakcija/list']);
  }

}