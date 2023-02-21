import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProizvodRepositoryService } from 'src/app/shared/services/proizvod-repository.service';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';
import { ProizvodForUpdate } from 'src/app/_interfaces/proizvodForUpdate.model';

@Component({
  selector: 'app-proizvod-update',
  templateUrl: './proizvod-update.component.html',
  styleUrls: ['./proizvod-update.component.css']
})
export class ProizvodUpdateComponent implements OnInit {

  proizvod: Proizvod;
  proizvodForm: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: ProizvodRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.proizvodForm = new FormGroup({
      sifra: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      naziv: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      jedinica_mjere: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cijena: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      stanje: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    this.getProizvodById();
  }

  private getProizvodById = () => {
    const proizvodId: string = this.activeRoute.snapshot.params['id'];
    const proizvodByIdUrl: string = `api/Proizvod/${proizvodId}`;

    this.repository.getProizvod(proizvodByIdUrl)
    .subscribe({
      next: (pro: Proizvod) => {
        this.proizvod = { ...pro, 
        };
        this.proizvodForm.patchValue(this.proizvod);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
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

  public updateProizvod = (proizvodFormValue) => {
    if (this.proizvodForm.valid)
      this.executeProizvodUpdate(proizvodFormValue);
  }

  private executeProizvodUpdate = (proizvodFormValue) => {
    const proizvodForUpd: ProizvodForUpdate = {
      sifra: proizvodFormValue.sifra,
      naziv: proizvodFormValue.naziv,
      jedinica_mjere: proizvodFormValue.jedinica_mjere,
      cijena: proizvodFormValue.cijena,
      stanje: proizvodFormValue.stanje
    }

    const apiUri: string = `api/Proizvod/${this.proizvod.id}`;

    this.repository.updateProizvod(apiUri, proizvodForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Proizvod updated successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToProizvodList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToProizvodList = () => {
    this.router.navigate(['/proizvod/list']);
  }

}