import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';
import { MovieComponent } from './comp/movie/movie.component';
import { HeaderComponent } from './comp/common/header/header.component';
import { LoginComponent } from './comp/login/login.component';
import { ActorsComponent } from './comp/actors/actors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    HeaderComponent,
    LoginComponent,
    ActorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
