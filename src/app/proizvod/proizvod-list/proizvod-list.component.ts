import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProizvodRepositoryService } from 'src/app/shared/services/proizvod-repository.service';
import { Proizvod } from 'src/app/_interfaces/proizvod.model';

@Component({
  selector: 'app-proizvod-list',
  templateUrl: './proizvod-list.component.html',
  styleUrls: ['./proizvod-list.component.css']
})
export class ProizvodListComponent implements OnInit {

  proizvodList: Proizvod[];

  errorMessage: string = '';
  

  constructor(private repository: ProizvodRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProizvod();
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

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/proizvod/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/proizvod/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}