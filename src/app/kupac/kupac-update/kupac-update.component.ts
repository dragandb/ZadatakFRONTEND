import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { KupacRepositoryService } from 'src/app/shared/services/kupac-repository.service';
import { Kupac } from 'src/app/_interfaces/kupac.model';
import { KupacForUpdate } from 'src/app/_interfaces/kupacForUpdate.model';

@Component({
  selector: 'app-kupac-update',
  templateUrl: './kupac-update.component.html',
  styleUrls: ['./kupac-update.component.css']
})
export class KupacUpdateComponent implements OnInit {

  kupac: Kupac;
  kupacForm: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: KupacRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.kupacForm = new FormGroup({
      sifra: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      naziv: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      adresa: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      mjesto: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getKupacById();
  }

  private getKupacById = () => {
    const kupacId: string = this.activeRoute.snapshot.params['id'];
    const kupacByIdUrl: string = `api/Kupac/${kupacId}`;

    this.repository.getKupac(kupacByIdUrl)
    .subscribe({
      next: (own: Kupac) => {
        this.kupac = { ...own, 
        };
        this.kupacForm.patchValue(this.kupac);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
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

  public updateKupac = (kupacFormValue) => {
    if (this.kupacForm.valid)
      this.executeKupacUpdate(kupacFormValue);
  }

  private executeKupacUpdate = (kupacFormValue) => {
    const kupacForUpd: KupacForUpdate = {
      sifra: kupacFormValue.sifra,
      naziv: kupacFormValue.naziv,
      adresa: kupacFormValue.adresa,
      mjesto: kupacFormValue.mjesto
    }

    const apiUri: string = `api/Kupac/${this.kupac.id}`;

    this.repository.updateKupac(apiUri, kupacForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Kupac updated successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToKupacList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToKupacList = () => {
    this.router.navigate(['/kupac/list']);
  }

}