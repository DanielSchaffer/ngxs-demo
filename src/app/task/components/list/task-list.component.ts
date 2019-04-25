import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../../task.model';
import { TaskState } from '../../task.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  public tasks$: Observable<Task[]>;

  // tslint:disable-next-line:variable-name
  private _showComplete: boolean;
  public get showComplete(): boolean {
    return this._showComplete;
  }
  public set showComplete(value: boolean) {
    this._showComplete = value;
    this.initTasks();
  }

  constructor(private store: Store) {
    this.initTasks();
  }

  private initTasks() {
    this.tasks$ = this.store.select(TaskState.getTasks)
      .pipe(map(tasks => {
        if (this.showComplete) {
          return tasks;
        }
        return tasks.filter(task => !task.complete);
      }));
  }

}
