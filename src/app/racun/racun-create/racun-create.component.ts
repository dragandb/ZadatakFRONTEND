import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RacunRepositoryService } from 'src/app/shared/services/racun-repository.service';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { Racun } from 'src/app/_interfaces/racun.model';
import { RacunForCreation } from 'src/app/_interfaces/racunForCreation.model';

@Component({
  selector: 'app-racun-create',
  templateUrl: './racun-create.component.html',
  styleUrls: ['./racun-create.component.css']
})
export class RacunCreateComponent implements OnInit {

  errorMessage: string = '';
  racunForm: FormGroup;
  bsModalRef?: BsModalRef;

  stavkaDetail !: FormArray<any>;
  stavkaProizvod !: FormGroup<any>;
  kupacList: Kupac[];
  proizvodList: Proizvod[];

  constructor(private repository: RacunRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService, private builder:FormBuilder) { }

  ngOnInit(): void {
    this.racunForm = new FormGroup({
      broj: new FormControl('', Validators.required),
      datum: new FormControl(''),
      napomena: new FormControl(''),
      kupacId: new FormControl('', Validators.required),
      naziv: new FormControl(''),
      adresa: new FormControl(''),
      mjesto: new FormControl(''),
      ukupno: new FormControl({value:0,disabled:true}),
      ukupnoPopust: new FormControl({value:0,disabled:true}),
      total: new FormControl({value:0,disabled:true}),
      stavke: new FormArray([]),
    });
    this.getAllKupac();
    this.getAllProizvod();
  }

  validateControl = (controlName: string) => {
    if (this.racunForm.get(controlName).invalid && this.racunForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.racunForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createRacun = (racunFormValue) => {
    if (this.racunForm.valid)
      this.executeRacunCreation(racunFormValue);
  }

  private executeRacunCreation = (racunFormValue) => {
    const racun: RacunForCreation = {
      broj: racunFormValue.broj,
      datum: racunFormValue.datum,
      napomena: racunFormValue.napomena,
      ukupno: racunFormValue.ukupno,
      ukupnoPopust: racunFormValue.ukupnoPopust,
      total: racunFormValue.total,
      kupacId: racunFormValue.kupacId,
      stavke: racunFormValue.stavke
    }
    const apiUrl = 'api/Racun';
    this.repository.createRacun(apiUrl, racun)
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
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToRacunList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToRacunList = () => {
    this.router.navigate(['/racun/list']);
  }

  addNewProduct(){
    this.stavkaDetail = this.racunForm.get("stavke") as FormArray;
    this.stavkaDetail.push(this.generateRow());
  }

  get invProizvodi(){
    return this.racunForm.get("stavke") as FormArray;
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

  private getAllKupac = () => {
    const apiAddress: string = 'api/Kupac';
    this.repository.getKupacList(apiAddress)
    .subscribe({
      next: (kup: Kupac[]) => this.kupacList = kup,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  private getAllProizvod = () => {
    const apiAddress: string = 'api/Proizvod';
    this.repository.getProizvodList(apiAddress)
    .subscribe({
      next: (pro: Proizvod[]) => this.proizvodList = pro,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  changeKupac() {
    let kupacId=this.racunForm.get("kupacId")?.value;
    this.repository.getKupac(kupacId).subscribe(res => {
      let kupdata: any;
      kupdata = res;
      if(kupdata!=null){
        this.racunForm.get("adresa")?.setValue(kupdata.adresa +', ' + kupdata.mjesto);
        this.racunForm.get("naziv")?.setValue(kupdata.naziv);
      }
    })
  }

  changeProizvod(index:any){
    this.stavkaDetail =this.racunForm.get("stavke") as FormArray;
    this.stavkaProizvod=this.stavkaDetail.at(index) as FormGroup;
    let proizvodId=this.stavkaProizvod.get("proizvodId")?.value;
    this.repository.getProizvod(proizvodId).subscribe(res => {
      let prodata: any;
      prodata = res;
      if(prodata!=null){
        this.stavkaProizvod.get("naziv")?.setValue(prodata.naziv);
        this.stavkaProizvod.get("cijena")?.setValue(prodata.cijena);
        this.ItemCalculation(index);
      }
    })
  }

  ItemCalculation(index:any){
    this.stavkaDetail =this.racunForm.get("stavke") as FormArray;
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
    let array=this.racunForm.getRawValue().stavke;
    let vrijednost=0
    array.forEach((x:any)=>{
      vrijednost=vrijednost+x.iznos;
    });
    let popustTotal=0
    array.forEach((x:any)=>{
      popustTotal=popustTotal+x.iznosPopusta;
    });

    let ukupnaVrijednost=vrijednost-popustTotal;

    this.racunForm.get("ukupno")?.setValue(vrijednost);
    this.racunForm.get("ukupnoPopust")?.setValue(popustTotal);
    this.racunForm.get("total")?.setValue(ukupnaVrijednost);
  }
}