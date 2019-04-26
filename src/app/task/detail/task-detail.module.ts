import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaskModule } from '../task.module';

import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskHistoryResolver } from './task-history.resolver';
import { TaskResolver } from './task.resolver';
import { CleanChangesPipe } from './clean-changes.pipe';

@NgModule({
  declarations: [
    TaskDetailComponent,
    CleanChangesPipe
  ],
  imports: [
    CommonModule,
    TaskDetailRoutingModule,
    TaskModule,
  ],
  providers: [
    TaskHistoryResolver,
    TaskResolver,
  ],
})
export class TaskDetailModule {}
