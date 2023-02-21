import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProizvodRoutingModule } from './proizvod-routing.module';
import { ProizvodListComponent } from './proizvod-list/proizvod-list.component';
import { ProizvodCreateComponent } from './proizvod-create/proizvod-create.component';
import { ProizvodUpdateComponent } from './proizvod-update/proizvod-update.component';
import { ProizvodDeleteComponent } from './proizvod-delete/proizvod-delete.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProizvodListComponent,
    ProizvodCreateComponent,
    ProizvodUpdateComponent,
    ProizvodDeleteComponent
  ],
  imports: [
    CommonModule,
    ProizvodRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProizvodModule { }
