import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TaskHistoryEntry } from './task-history-entry.model';

@Injectable()
export class TaskHistoryResolver implements Resolve<TaskHistoryEntry[]> {

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskHistoryEntry[]> {
    return undefined;
  }

}
