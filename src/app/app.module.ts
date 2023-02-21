import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { KupacModule } from './kupac/kupac.module';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { DatePipe } from '@angular/common';
import { ProizvodModule } from './proizvod/proizvod.module';
import { RacunModule } from './racun/racun.module';
import { StavkaModule } from './stavka/stavka.module';
import { TransakcijaModule } from './transakcija/transakcija.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule,
    HttpClientModule,
    KupacModule,
    ProizvodModule,
    RacunModule,
    StavkaModule,
    TransakcijaModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
