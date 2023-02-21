import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RacunRepositoryService } from 'src/app/shared/services/racun-repository.service';
import { Racun } from 'src/app/_interfaces/racun.model';

@Component({
  selector: 'app-racun-list',
  templateUrl: './racun-list.component.html',
  styleUrls: ['./racun-list.component.css']
})
export class RacunListComponent implements OnInit {

  racunList: Racun[];

  errorMessage: string = '';
  

  constructor(private repository: RacunRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRacun();
  }

  private getAllRacun = () => {
    const apiAddress: string = 'api/Racun';
    this.repository.getRacunList(apiAddress)
    .subscribe({
      next: (rac: Racun[]) => this.racunList = rac,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/racun/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/racun/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}