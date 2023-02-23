import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacunRoutingModule } from './racun-routing.module';
import { RacunListComponent } from './racun-list/racun-list.component';
import { RacunCreateComponent } from './racun-create/racun-create.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RacunUpdateComponent } from './racun-update/racun-update.component';
import { RacunDeleteComponent } from './racun-delete/racun-delete.component';


@NgModule({
  declarations: [
    RacunListComponent,
    RacunCreateComponent,
    RacunUpdateComponent,
    RacunDeleteComponent
  ],
  imports: [
    CommonModule,
    RacunRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RacunModule { }
