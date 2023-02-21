import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransakcijaCreateComponent } from './transakcija-create/transakcija-create.component';
import { TransakcijaDeleteComponent } from './transakcija-delete/transakcija-delete.component';
import { TransakcijaListComponent } from './transakcija-list/transakcija-list.component';
import { TransakcijaUpdateComponent } from './transakcija-update/transakcija-update.component';

const routes: Routes = [
  { path:'list', component: TransakcijaListComponent },
  { path: 'create', component: TransakcijaCreateComponent },
  { path: 'update/:id', component: TransakcijaUpdateComponent },
  { path: 'delete/:id', component: TransakcijaDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransakcijaRoutingModule { }
