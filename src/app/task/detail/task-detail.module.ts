import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskHistoryEndpoint } from './task-history.endpoint';
import { TaskHistoryResolver } from './task-history.resolver';
import { TaskResolver } from './task.resolver';

@NgModule({
  declarations: [
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    TaskDetailRoutingModule,
  ],
  providers: [
    TaskHistoryEndpoint,
    TaskHistoryResolver,
    TaskResolver,
  ],
})
export class TaskDetailModule {}