import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavListComponent } from './nav-list/nav-list.component';

const routes: Routes = [
  { path: 'navlist', component: NavListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
