import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { TaskCreateComponent } from './components/create/task-create.component';
import { TaskListComponent } from './components/list/task-list.component';
import { TaskView } from './components/view/task.view';
import { TaskRoutingModule } from './task-routing.module';
import { TaskEndpoint } from './task.endpoint';
import { TasksResolver } from './tasks.resolver';
import { TaskState } from './task.state';

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskListComponent,
    TaskView,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      TaskState,
    ]),
    TaskRoutingModule,
  ],
  providers: [
    TaskEndpoint,
    TasksResolver,
  ]
})
export class TaskModule {}
