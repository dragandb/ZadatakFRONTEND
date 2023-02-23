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
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    LoginComponent,
    RegisterComponent,
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
    TransakcijaModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7186"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
