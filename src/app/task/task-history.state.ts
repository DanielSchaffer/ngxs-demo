import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';

import { AddTaskHistoryEntry } from './add-task-history-entry.action';
import { GetTaskHistory } from './get-task-history.action';
import { TaskAdded } from './task-added.action';
import { TaskHistoryEntry } from './task-history-entry.model';
import { TaskHistoryEndpoint } from './task-history.endpoint';
import { TaskUpdated } from './task-updated.action';

export class TaskHistoryStateModel {
  public history: { [taskId: string]: TaskHistoryEntry[] };
}

@State<TaskHistoryStateModel>({
  name: 'taskHistory',
  defaults: {
    history: {},
  },
})
export class TaskHistoryState {

  @Selector()
  public static getHistory(state: TaskHistoryStateModel): { [taskId: string]: TaskHistoryEntry[] } {
    return state.history;
  }

  public static getTaskHistory(taskId: string): (state: TaskHistoryStateModel) => TaskHistoryEntry[] {
    return (state: TaskHistoryStateModel) => state.history[taskId];
  }

  constructor(private taskHistoryEndpoint: TaskHistoryEndpoint) {}

  @Action(TaskAdded)
  public onTaskAdded(ctx: StateContext<TaskHistoryStateModel>, { payload }: TaskAdded) {
    ctx.dispatch(new AddTaskHistoryEntry(TaskAdded.type, payload));
  }

  @Action(TaskUpdated)
  public onTaskUpdated(ctx: StateContext<TaskHistoryStateModel>, { payload }: TaskUpdated) {
    ctx.dispatch(new AddTaskHistoryEntry(TaskUpdated.type, payload));
  }

  @Action(AddTaskHistoryEntry)
  public addEntry(ctx: StateContext<TaskHistoryStateModel>, { payload }: AddTaskHistoryEntry) {
    return this.taskHistoryEndpoint.addEntry(payload);
  }

  @Action(GetTaskHistory)
  public getHistory(ctx: StateContext<TaskHistoryStateModel>, { payload }: GetTaskHistory) {
    return this.taskHistoryEndpoint.getList(payload)
      .pipe(tap(history => {
        ctx.setState(patch({
          history: {
            [payload.id]: history,
          },
        }));
      }));
  }

}
