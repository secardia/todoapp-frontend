import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavListComponent } from './nav-list/nav-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
