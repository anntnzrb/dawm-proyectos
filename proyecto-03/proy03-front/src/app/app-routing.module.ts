import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './comp/actors/actors.component';
import { FilterComponent } from './comp/filter/filter.component';
import { HomeComponent } from './comp/home/home.component';
import { LoginComponent } from './comp/login/login.component';
import { MovieComponent } from './comp/movie/movie.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "movie/:id",
    component: MovieComponent
  },
  {
    path: "actors",
    component: ActorsComponent
  },
  {
    path: "filter",
    component: FilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
