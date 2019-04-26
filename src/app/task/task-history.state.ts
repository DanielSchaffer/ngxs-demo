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
  public entriesByTaskId: { [taskId: string]: TaskHistoryEntry[] };
}

interface GlobalState {
  taskHistory: TaskHistoryStateModel;
}

@State<TaskHistoryStateModel>({
  name: 'taskHistory',
  defaults: {
    entriesByTaskId: {},
  },
})
export class TaskHistoryState {

  @Selector()
  public static getHistory(state: TaskHistoryStateModel): { [taskId: string]: TaskHistoryEntry[] } {
    return state.entriesByTaskId;
  }

  public static getTaskHistory(taskId: string): ({ taskHistory }: GlobalState) => TaskHistoryEntry[] {
    return ({ taskHistory }: GlobalState) => taskHistory.entriesByTaskId[taskId];
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
          entriesByTaskId: {
            [payload]: history,
          },
        }));
      }));
  }

}
