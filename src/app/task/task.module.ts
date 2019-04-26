import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { TaskCreateComponent } from './components/create/task-create.component';
import { TaskListPrefsState } from './components/list/task-list-prefs.state';
import { TaskListComponent } from './components/list/task-list.component';
import { TaskView } from './components/view/task.view';
import { TaskHistoryEndpoint } from './task-history.endpoint';
import { TaskHistoryState } from './task-history.state';
import { TaskRoutingModule } from './task-routing.module';
import { TaskEndpoint } from './task.endpoint';
import { TasksResolver } from './tasks.resolver';
import { TaskState } from './task.state';
import { TaskListItemComponent } from './components/list-item/task-list-item.component';

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskView,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      TaskState,
      TaskHistoryState,
      TaskListPrefsState,
    ]),
    TaskRoutingModule,
    FormsModule,
  ],
  providers: [
    TaskEndpoint,
    TaskHistoryEndpoint,
    TasksResolver,
  ]
})
export class TaskModule {}
