import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransakcijaRoutingModule } from './transakcija-routing.module';
import { TransakcijaListComponent } from './transakcija-list/transakcija-list.component';
import { TransakcijaCreateComponent } from './transakcija-create/transakcija-create.component';
import { TransakcijaUpdateComponent } from './transakcija-update/transakcija-update.component';
import { TransakcijaDeleteComponent } from './transakcija-delete/transakcija-delete.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransakcijaListComponent,
    TransakcijaCreateComponent,
    TransakcijaUpdateComponent,
    TransakcijaDeleteComponent
  ],
  imports: [
    CommonModule,
    TransakcijaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TransakcijaModule { }
