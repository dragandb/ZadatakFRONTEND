import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StavkaRoutingModule } from './stavka-routing.module';
import { StavkaListComponent } from './stavka-list/stavka-list.component';
import { StavkaCreateComponent } from './stavka-create/stavka-create.component';
import { StavkaUpdateComponent } from './stavka-update/stavka-update.component';
import { StavkaDeleteComponent } from './stavka-delete/stavka-delete.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StavkaListComponent,
    StavkaCreateComponent,
    StavkaUpdateComponent,
    StavkaDeleteComponent
  ],
  imports: [
    CommonModule,
    StavkaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StavkaModule { }
