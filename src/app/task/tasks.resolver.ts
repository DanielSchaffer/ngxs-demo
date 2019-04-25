import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetTasks } from './get-tasks.action';
import { Task } from './task.model';
import { TaskState } from './task.state';

@Injectable()
export class TasksResolver implements Resolve<Task[]> {

  constructor(private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    this.store.dispatch(new GetTasks());

    return this.store.selectOnce(TaskState.getTasks);
  }

}
