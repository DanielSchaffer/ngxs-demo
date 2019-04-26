import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TaskHistoryEntry } from '../../../task-history-entry.model';
import { TaskHistoryState } from '../../../task-history.state';
import { Task } from '../../../task.model';
import { TaskState } from '../../../task.state';
import { TASK_DETAIL_TASK_PARAM } from '../../task-detail.routing-constants';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {

  @HostBinding('class')
  public cssClasses = 'col-12';

  public readonly task$: Observable<Task>;
  public readonly history$: Observable<TaskHistoryEntry[]>;

  constructor(store: Store, route: ActivatedRoute) {
    const taskId = route.snapshot.params[TASK_DETAIL_TASK_PARAM];
    this.task$ = store.select(TaskState.getTask(taskId));
    this.history$ = store.select(TaskHistoryState.getTaskHistory(taskId));
  }
}
