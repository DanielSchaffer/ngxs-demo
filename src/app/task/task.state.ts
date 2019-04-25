import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { UserAuthorized } from '../auth/user-authorized.action';
import { User } from '../auth/user.model';

import { AddTask } from './add-task.action';
import { GetTasks } from './get-tasks.action';
import { ResetTasks } from './reset-tasks.action';
import { TaskEndpoint } from './task.endpoint';
import { Task } from './task.model';

export class TaskStateModel {
  public tasks: Task[];
}

@State<TaskStateModel>({
  name: 'task',
  defaults: {
    tasks: [],
  },
})
export class TaskState implements NgxsOnInit {

  @Selector()
  public static getTasks(state: TaskStateModel): Task[] {
    return state.tasks;
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

  @Action(ResetTasks)
  public resetTasks(ctx: StateContext<TaskStateModel>) {
    ctx.setState(patch<TaskStateModel>({
      tasks: [],
    }));
  }

}
