import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StavkaCreateComponent } from './stavka-create/stavka-create.component';
import { StavkaDeleteComponent } from './stavka-delete/stavka-delete.component';
import { StavkaListComponent } from './stavka-list/stavka-list.component';
import { StavkaUpdateComponent } from './stavka-update/stavka-update.component';

const routes: Routes = [
  { path:'list', component: StavkaListComponent },
  { path: 'create', component: StavkaCreateComponent },
  { path: 'update/:id', component: StavkaUpdateComponent },
  { path: 'delete/:id', component: StavkaDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StavkaRoutingModule { }
