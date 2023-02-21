import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacunRoutingModule } from './racun-routing.module';
import { RacunListComponent } from './racun-list/racun-list.component';


@NgModule({
  declarations: [
    RacunListComponent
  ],
  imports: [
    CommonModule,
    RacunRoutingModule
  ]
})
export class RacunModule { }
