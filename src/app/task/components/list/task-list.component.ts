import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../../task.model';
import { TaskState } from '../../task.state';
import { SetPrefs } from './set-prefs.action';
import { TaskListPrefsState, TaskListPrefsStateModel } from './task-list-prefs.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  public tasks$: Observable<Task[]>;
  @Select(TaskListPrefsState.getUserPrefs()) public prefs$: Observable<TaskListPrefsStateModel>;

  constructor(private store: Store) {
    this.tasks$ = combineLatest(this.store.select(TaskState.getTasks), this.prefs$)
      .pipe(map(([tasks, prefs]) => {
        if (!tasks) {
          return undefined;
        }

        // TODO: might be more efficient to only select the showComplete pref, so we don't get updates when other prefs change
        if (prefs && prefs.showComplete) {
          return tasks;
        }
        return tasks.filter(task => !task.complete);
      }));
  }

  public setShowComplete(showComplete: boolean) {
    this.store.dispatch(new SetPrefs({ showComplete }));
  }

}
