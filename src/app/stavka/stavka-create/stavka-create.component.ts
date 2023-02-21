import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { StavkaRepositoryService } from 'src/app/shared/services/stavka-repository.service';
import { Stavka } from 'src/app/_interfaces/stavka.model';
import { StavkaForCreation } from 'src/app/_interfaces/stavkaForCreation.model';

@Component({
  selector: 'app-stavka-create',
  templateUrl: './stavka-create.component.html',
  styleUrls: ['./stavka-create.component.css']
})
export class StavkaCreateComponent implements OnInit {

  errorMessage: string = '';
  stavkaForm: FormGroup;
  bsModalRef?: BsModalRef;
  stavkaDetail !: FormArray<any>;

  constructor(private repository: StavkaRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.stavkaForm = new FormGroup({
      broj: new FormControl('', Validators.required),
      kupacId: new FormControl('', Validators.required),
      naziv: new FormControl(''),
      adresa: new FormControl(''),
      mjesto: new FormControl(''),
      datum: new FormControl(''),
      napomena: new FormControl(''),
      vrijednost: new FormControl({value:0,disabled:true}),
      popust: new FormControl({value:0,disabled:true}),
      ukupnaVrijednost: new FormControl({value:0,disabled:true}),
      detalji: new FormArray([]),
    });
  }

  validateControl = (controlName: string) => {
    if (this.stavkaForm.get(controlName).invalid && this.stavkaForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.stavkaForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createStavka = (stavkaFormValue) => {
    if (this.stavkaForm.valid)
      this.executeStavkaCreation(stavkaFormValue);
  }

  private executeStavkaCreation = (stavkaFormValue) => {
    const stavka: StavkaForCreation = {
      cijena: stavkaFormValue.sifra,
      kolicina: stavkaFormValue.naziv,
      popust: stavkaFormValue.jedinica_mjere,
      iznos_popusta: stavkaFormValue.cijena,
      vrijednost: stavkaFormValue.stanje
    }
    const apiUrl = 'api/Stavka';
    this.repository.createStavka(apiUrl, stavka)
    .subscribe({
      next: (stv: Stavka) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Stavka: ${stv.id} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToStavkaList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToStavkaList = () => {
    this.router.navigate(['/stavka/list']);
  }

  addNewProduct(){
    this.stavkaDetail = this.stavkaForm.get("detalji") as FormArray;
    this.stavkaDetail.push(this.generateRow());
  }

  get invProizvodi(){
    return this.stavkaForm.get("detalji") as FormArray;
  }

  generateRow(){
    return this.builder.group({
      brojRacuna: this.builder.control(''),
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

  
}