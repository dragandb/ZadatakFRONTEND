import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { KupacRepositoryService } from 'src/app/shared/services/kupac-repository.service';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { KupacForCreation } from 'src/app/_interfaces/kupacForCreation.model';


@Component({
  selector: 'app-kupac-create',
  templateUrl: './kupac-create.component.html',
  styleUrls: ['./kupac-create.component.css']
})
export class KupacCreateComponent implements OnInit {

  errorMessage: string = '';
  kupacForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: KupacRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.kupacForm = new FormGroup({
      sifra: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      naziv: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      adresa: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mjesto: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.kupacForm.get(controlName).invalid && this.kupacForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.kupacForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createKupac = (kupacFormValue) => {
    if (this.kupacForm.valid)
      this.executeKupacCreation(kupacFormValue);
  }

  private executeKupacCreation = (kupacFormValue) => {
    const kupac: KupacForCreation = {
      sifra: kupacFormValue.sifra,
      naziv: kupacFormValue.naziv,
      adresa: kupacFormValue.adresa,
      mjesto: kupacFormValue.mjesto
    }
    const apiUrl = 'api/Kupac';
    this.repository.createKupac(apiUrl, kupac)
    .subscribe({
      next: (kup: Kupac) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Kupac: ${kup.naziv} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToKupacList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToKupacList = () => {
    this.router.navigate(['/kupac/list']);
  }
}