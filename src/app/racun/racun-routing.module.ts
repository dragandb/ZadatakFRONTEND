import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacunCreateComponent } from './racun-create/racun-create.component';
import { RacunDeleteComponent } from './racun-delete/racun-delete.component';
import { RacunListComponent } from './racun-list/racun-list.component';
import { RacunUpdateComponent } from './racun-update/racun-update.component';

const routes: Routes = [
  { path:'list', component: RacunListComponent },
  { path: 'create', component: RacunCreateComponent },
  { path: 'update/:id', component: RacunUpdateComponent },
  { path: 'delete/:id', component: RacunDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacunRoutingModule { }
