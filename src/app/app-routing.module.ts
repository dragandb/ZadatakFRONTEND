import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'kupac', loadChildren: () => import('./kupac/kupac.module').then(m => m.KupacModule) },
  { path: 'proizvod', loadChildren: () => import('./proizvod/proizvod.module').then(m => m.ProizvodModule) },
  { path: 'racun', loadChildren: () => import('./racun/racun.module').then(m => m.RacunModule) },
  { path: 'stavka', loadChildren: () => import('./stavka/stavka.module').then(m => m.StavkaModule) },
  { path: 'transakcija', loadChildren: () => import('./transakcija/transakcija.module').then(m => m.TransakcijaModule) },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
