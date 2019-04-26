import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { take, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UserAuthorized } from '../auth/user-authorized.action';
import { User } from '../auth/user.model';

import { AddTask } from './add-task.action';
import { DeleteTask } from './delete-task.action';
import { GetTask } from './get-task.action';
import { GetTasks } from './get-tasks.action';
import { ResetTasks } from './reset-tasks.action';
import { TaskAdded } from './task-added.action';
import { TaskUpdated } from './task-updated.action';
import { TaskEndpoint } from './task.endpoint';
import { Task } from './task.model';
import { UpdateTask } from './update-task.action';

export class TaskStateModel {
  public tasks: Task[];
}

interface GlobalState {
  task: TaskStateModel;
}

@State<TaskStateModel>({
  name: 'task',
  defaults: {
    tasks: [],
  },
})
@Injectable()
export class TaskState implements NgxsOnInit {

  @Selector()
  public static getTasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  public static getTask(taskId: string): ({ task }: GlobalState) => Task {
    return ({ task }: GlobalState) => {
      return task.tasks.find(taskItem => taskItem.id === taskId);
    };
  }

  constructor(private taskEndpoint: TaskEndpoint, private authService: AuthService) {}

  public ngxsOnInit(ctx?: StateContext<any>): void | any {
    return this.authService.authUser$
      .pipe(
        take(1),
        tap((user: User) => {
          if (user) {
            this.onUserAuthorized(ctx);
          }
        })
      )
      .subscribe();
  }

  @Action(UserAuthorized)
  public onUserAuthorized(ctx: StateContext<TaskStateModel>) {
    ctx.dispatch(new ResetTasks());
  }

  @Action(AddTask)
  public add(ctx: StateContext<TaskStateModel>, { payload }: AddTask) {
    // TODO: add the new item immediately, then update the item with the returned object
    return this.taskEndpoint.addTask(payload)
      .pipe(tap(addedTask => {
        const state = ctx.getState();
        ctx.setState(patch({
          tasks: [...state.tasks, addedTask],
        }));
        ctx.dispatch(new TaskAdded(addedTask));
      }));
  }

  @Action(GetTask)
  public getTask(ctx: StateContext<TaskStateModel>, { payload }: GetTask) {
    return this.taskEndpoint.getTask(payload)
      .pipe(tap(fetchedTask => {
        const state = ctx.getState();
        const existing = state.tasks.find(task => task.id === fetchedTask.id);
        if (existing) {
          ctx.setState(patch({
            tasks: updateItem(task => task === existing, fetchedTask),
          }));
        } else {
          ctx.setState(patch({
            tasks: append([fetchedTask]),
          }));
        }
      }));
  }

  @Action(GetTasks)
  public getTasks(ctx: StateContext<TaskStateModel>) {
    return this.taskEndpoint.getList()
      .pipe(tap(tasks => {
        ctx.setState(patch({
          tasks,
        }));
      }));
  }

  @Action(UpdateTask)
  public updateTask(ctx: StateContext<TaskStateModel>, { payload }: UpdateTask) {
    return this.taskEndpoint.updateTask(payload)
      .pipe(tap((updatedTask: Task) => {
        ctx.setState(patch({
          tasks: updateItem(task => task.id === payload.id, updatedTask)
        }));
        ctx.dispatch(new TaskUpdated(payload));
      }));
  }

  @Action(DeleteTask)
  public deleteTask(ctx: StateContext<TaskStateModel>, { payload }: DeleteTask) {
    return this.taskEndpoint.deleteTask(payload)
      .pipe(tap((deletedTask: Task) => {
        ctx.setState(patch({
          tasks: removeItem<Task>(task => task.id === (deletedTask || payload).id)
        }));
      }));
  }

  @Action(ResetTasks)
  public resetTasks(ctx: StateContext<TaskStateModel>) {
    ctx.setState(patch<TaskStateModel>({
      tasks: [],
    }));
  }

}
