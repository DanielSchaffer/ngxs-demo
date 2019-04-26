import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { GetTask } from '../get-task.action';
import { Task } from '../task.model';
import { TaskState } from '../task.state';

import { TASK_DETAIL_TASK_PARAM } from './task-detail.routing-constants';

@Injectable()
export class TaskResolver implements Resolve<Task> {

  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    const taskId = route.params[TASK_DETAIL_TASK_PARAM];
    return this.store.selectOnce(TaskState.getTask(taskId))
      .pipe(mergeMap(routeTask => {
        if (routeTask) {
          return of(routeTask);
        }
        this.store.dispatch(new GetTask({ id: taskId }));
        return this.store.selectOnce(TaskState.getTask(taskId));
      }));
  }

}
