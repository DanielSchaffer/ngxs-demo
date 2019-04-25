import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AUTH_ROOT_PATH } from './auth/auth.routing-constants';

const routes: Routes = [
  { path: AUTH_ROOT_PATH, loadChildren: './auth/auth.module#AuthModule' },
  { path: '', pathMatch: 'full', canActivateChild: [AuthGuard], loadChildren: './task/task.module#TaskModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
