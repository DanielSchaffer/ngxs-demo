import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TASK_DETAIL_PATH } from './task-detail.routing-constants';
import { TaskHistoryResolver } from './task-history.resolver';
import { TaskResolver } from './task.resolver';

const routes: Routes = [
  { path: TASK_DETAIL_PATH, resolve: { task: TaskResolver, history: TaskHistoryResolver }, component: TaskDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TaskDetailRoutingModule {}
