import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Task } from '../../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  public readonly tasks$: Observable<Task[]>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(state => state.task.tasks);
  }

}
