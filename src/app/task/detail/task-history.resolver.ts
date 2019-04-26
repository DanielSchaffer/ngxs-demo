import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetTaskHistory } from '../get-task-history.action';
import { TaskHistoryEntry } from '../task-history-entry.model';
import { TaskHistoryState } from '../task-history.state';

import { TASK_DETAIL_TASK_PARAM } from './task-detail.routing-constants';


@Injectable()
export class TaskHistoryResolver implements Resolve<TaskHistoryEntry[]> {

  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskHistoryEntry[]> {
    const taskId = route.params[TASK_DETAIL_TASK_PARAM];
    this.store.dispatch(new GetTaskHistory(taskId));
    return this.store.selectOnce(TaskHistoryState.getTaskHistory(taskId));
  }

}
