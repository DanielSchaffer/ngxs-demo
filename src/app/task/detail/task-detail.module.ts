import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskDetailRoutingModule } from './task-detail-routing.module';
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
    TaskHistoryResolver,
    TaskResolver,
  ],
})
export class TaskDetailModule {}
