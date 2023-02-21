import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { StavkaRepositoryService } from 'src/app/shared/services/stavka-repository.service';
import { Stavka } from 'src/app/_interfaces/stavka.model';

@Component({
  selector: 'app-stavka-list',
  templateUrl: './stavka-list.component.html',
  styleUrls: ['./stavka-list.component.css']
})
export class StavkaListComponent implements OnInit {

  stavkaList: Stavka[];

  errorMessage: string = '';
  

  constructor(private repository: StavkaRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStavka();
  }

  private getAllStavka = () => {
    const apiAddress: string = 'api/Stavka';
    this.repository.getStavkaList(apiAddress)
    .subscribe({
      next: (sta: Stavka[]) => this.stavkaList = sta,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/stavka/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/stavka/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}