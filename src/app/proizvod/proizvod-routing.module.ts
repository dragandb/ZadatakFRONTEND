import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProizvodCreateComponent } from './proizvod-create/proizvod-create.component';
import { ProizvodDeleteComponent } from './proizvod-delete/proizvod-delete.component';
import { ProizvodListComponent } from './proizvod-list/proizvod-list.component';
import { ProizvodUpdateComponent } from './proizvod-update/proizvod-update.component';

const routes: Routes = [
  { path:'list', component: ProizvodListComponent },
  { path: 'create', component: ProizvodCreateComponent },
  { path: 'update/:id', component: ProizvodUpdateComponent },
  { path: 'delete/:id', component: ProizvodDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProizvodRoutingModule { }
