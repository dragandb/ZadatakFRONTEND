import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProizvodRepositoryService } from 'src/app/shared/services/proizvod-repository.service';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';

@Component({
  selector: 'app-proizvod-delete',
  templateUrl: './proizvod-delete.component.html',
  styleUrls: ['./proizvod-delete.component.css']
})
export class ProizvodDeleteComponent implements OnInit {

  proizvod: Proizvod;
  bsModalRef?: BsModalRef;
  
  constructor(private repository: ProizvodRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

    ngOnInit(): void {
      this.getProizvodById();
    }
    private getProizvodById = () => {
      const proizvodId: string = this.activeRoute.snapshot.params['id'];
      const apiUri: string = `api/Proizvod/${proizvodId}`;
      this.repository.getProizvod(apiUri)
      .subscribe({
        next: (pro: Proizvod) => this.proizvod = pro,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }

    redirectToProizvodList = () => {
      this.router.navigate(['/proizvod/list']);
    }

    deleteProizvod = () => {
      const deleteUri: string = `api/Proizvod/${this.proizvod.id}`;
      this.repository.deleteProizvod(deleteUri)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Proizvod deleted successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToProizvodList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
}