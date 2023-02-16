import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { KupacRepositoryService } from 'src/app/shared/services/kupac-repository.service';
import { Kupac } from 'src/app/_interfaces/kupac.model';

@Component({
  selector: 'app-kupac-delete',
  templateUrl: './kupac-delete.component.html',
  styleUrls: ['./kupac-delete.component.css']
})
export class KupacDeleteComponent implements OnInit {

  kupac: Kupac;
  bsModalRef?: BsModalRef;
  
  constructor(private repository: KupacRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

    ngOnInit(): void {
      this.getKupacById();
    }
    private getKupacById = () => {
      const kupacId: string = this.activeRoute.snapshot.params['id'];
      const apiUri: string = `api/Kupac/${kupacId}`;
      this.repository.getKupac(apiUri)
      .subscribe({
        next: (kup: Kupac) => this.kupac = kup,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }

    redirectToKupacList = () => {
      this.router.navigate(['/kupac/list']);
    }

    deleteKupac = () => {
      const deleteUri: string = `api/Kupac/${this.kupac.id}`;
      this.repository.deleteKupac(deleteUri)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Kupac deleted successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToKupacList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
}