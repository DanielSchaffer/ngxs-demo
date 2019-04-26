import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AUTH_ROOT_PATH } from './auth/auth.routing-constants';
import { TASK_DETAIL_ROOT_PATH } from './task/detail/task-detail.routing-constants';

const routes: Routes = [
  { path: AUTH_ROOT_PATH, loadChildren: './auth/auth.module#AuthModule' },
  { path: '', pathMatch: 'full', canActivateChild: [AuthGuard], loadChildren: './task/task.module#TaskModule' },
  { path: TASK_DETAIL_ROOT_PATH, loadChildren: './task/detail/task-detail.module#TaskDetailModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
