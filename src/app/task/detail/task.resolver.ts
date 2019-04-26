import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { GetTask } from '../get-task.action';
import { Task } from '../task.model';
import { TaskState } from '../task.state';
import { ROUTE_DETAIL_TASK_PARAM } from './task-detail.routing-constants';

@Injectable()
export class TaskResolver implements Resolve<Task> {

  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    return this.store.selectOnce(TaskState.getTasks)
      .pipe(mergeMap(tasks => {
        const taskId = route.params[ROUTE_DETAIL_TASK_PARAM];
        const routeTask = tasks.find(task => task.id === taskId);
        if (routeTask) {
          return of(routeTask);
        }
        this.store.dispatch(new GetTask({ id: taskId }));
        return this.resolve(route, state); // danger!
      }));
  }

}
