import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskView } from './components/view/task.view';
import { ROUTE_DETAIL_PATH } from './detail/task-detail.routing-constants';
import { TasksResolver } from './tasks.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TaskView, resolve: { tasks: TasksResolver } },
  { path: ROUTE_DETAIL_PATH, loadChildren: './detail/task-detail.module#TaskDetailModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class TaskRoutingModule {}
