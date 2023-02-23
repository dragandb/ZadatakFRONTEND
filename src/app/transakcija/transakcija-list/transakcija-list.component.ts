import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TransakcijaRepositoryService } from 'src/app/shared/services/transakcija-repository.service';
import { Racun } from 'src/app/_interfaces/racun.model';


@Component({
  selector: 'app-transakcija-list',
  templateUrl: './transakcija-list.component.html',
  styleUrls: ['./transakcija-list.component.css']
})
export class TransakcijaListComponent implements OnInit {

  transakcijaList: Racun[];

  errorMessage: string = '';
  

  constructor(private repository: TransakcijaRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRacun();
  }

  private getAllRacun(){
    this.repository.getRacunList()
    .subscribe({
      next: (rac: Racun[]) => this.transakcijaList = rac,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }  
  

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/transakcija/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/transakcija/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}