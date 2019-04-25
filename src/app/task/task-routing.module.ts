import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskView } from './components/view/task.view';
import { TasksResolver } from './tasks.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TaskView, resolve: { tasks: TasksResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class TaskRoutingModule {}
