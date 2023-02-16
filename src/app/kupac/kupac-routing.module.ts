import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KupacCreateComponent } from './kupac-create/kupac-create.component';
import { KupacDeleteComponent } from './kupac-delete/kupac-delete.component';
import { KupacListComponent } from './kupac-list/kupac-list.component';
import { KupacUpdateComponent } from './kupac-update/kupac-update.component';

const routes: Routes = [
  { path:'list', component: KupacListComponent },
  { path: 'create', component: KupacCreateComponent },
  { path: 'update/:id', component: KupacUpdateComponent },
  { path: 'delete/:id', component: KupacDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KupacRoutingModule { }
