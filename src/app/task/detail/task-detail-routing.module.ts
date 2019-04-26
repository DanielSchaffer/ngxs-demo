import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskHistoryResolver } from './task-history.resolver';
import { TaskResolver } from './task.resolver';

const routes: Routes = [
  { path: '', resolve: { task: TaskResolver, history: TaskHistoryResolver }, component: TaskDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class TaskDetailRoutingModule {}
