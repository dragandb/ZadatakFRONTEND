import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KupacRoutingModule } from './kupac-routing.module';
import { KupacListComponent } from './kupac-list/kupac-list.component';
import { SharedModule } from '../shared/shared.module';
import { KupacCreateComponent } from './kupac-create/kupac-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KupacUpdateComponent } from './kupac-update/kupac-update.component';
import { KupacDeleteComponent } from './kupac-delete/kupac-delete.component';


@NgModule({
  declarations: [
    KupacListComponent,
    KupacCreateComponent,
    KupacUpdateComponent,
    KupacDeleteComponent
  ],
  imports: [
    CommonModule,
    KupacRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class KupacModule { }
