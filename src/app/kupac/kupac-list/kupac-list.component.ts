import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { KupacRepositoryService } from 'src/app/shared/services/kupac-repository.service';
import { Kupac } from 'src/app/_interfaces/kupac.model';

@Component({
  selector: 'app-kupac-list',
  templateUrl: './kupac-list.component.html',
  styleUrls: ['./kupac-list.component.css']
})
export class KupacListComponent implements OnInit {

  kupacList: Kupac[];

  errorMessage: string = '';
  

  constructor(private repository: KupacRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllKupac();
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

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/kupac/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/kupac/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}