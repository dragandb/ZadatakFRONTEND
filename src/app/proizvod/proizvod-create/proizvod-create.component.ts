import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProizvodRepositoryService } from 'src/app/shared/services/proizvod-repository.service';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { ProizvodForCreation } from 'src/app/_interfaces/proizvodForCreation.model';

@Component({
  selector: 'app-proizvod-create',
  templateUrl: './proizvod-create.component.html',
  styleUrls: ['./proizvod-create.component.css']
})
export class ProizvodCreateComponent implements OnInit {

  errorMessage: string = '';
  proizvodForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: ProizvodRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.proizvodForm = new FormGroup({
      sifra: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      naziv: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      jedinica_mjere: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cijena: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      stanje: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.proizvodForm.get(controlName).invalid && this.proizvodForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.proizvodForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createProizvod = (proizvodFormValue) => {
    if (this.proizvodForm.valid)
      this.executeProizvodCreation(proizvodFormValue);
  }

  private executeProizvodCreation = (proizvodFormValue) => {
    const proizvod: ProizvodForCreation = {
      sifra: proizvodFormValue.sifra,
      naziv: proizvodFormValue.naziv,
      jedinica_mjere: proizvodFormValue.jedinica_mjere,
      cijena: proizvodFormValue.cijena,
      stanje: proizvodFormValue.stanje
    }
    const apiUrl = 'api/Proizvod';
    this.repository.createProizvod(apiUrl, proizvod)
    .subscribe({
      next: (pro: Proizvod) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Proizvod: ${pro.naziv} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToProizvodList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToProizvodList = () => {
    this.router.navigate(['/proizvod/list']);
  }
}