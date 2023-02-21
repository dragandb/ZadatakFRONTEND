import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TransakcijaRepositoryService } from 'src/app/shared/services/transakcija-repository.service';
import { Stavka } from 'src/app/_interfaces/stavka.model';

@Component({
  selector: 'app-transakcija-list',
  templateUrl: './transakcija-list.component.html',
  styleUrls: ['./transakcija-list.component.css']
})
export class TransakcijaListComponent implements OnInit {

  transakcijaList: Stavka[];

  errorMessage: string = '';
  constructor(private repository: TransakcijaRepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {

  }
}