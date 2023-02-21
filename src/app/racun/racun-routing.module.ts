import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacunListComponent } from './racun-list/racun-list.component';

const routes: Routes = [
  { path:'list', component: RacunListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacunRoutingModule { }
