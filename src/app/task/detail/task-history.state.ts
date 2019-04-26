import { Action, Selector, State, StateContext } from '@ngxs/store';

import { TaskAdded } from '../task-added.action';
import { TaskUpdated } from '../task-updated.action';

import { TaskHistoryEntry } from './task-history-entry.model';
import { TaskHistoryEndpoint } from './task-history.endpoint';

export class TaskHistoryStateModel {
  public history: Map<string, TaskHistoryEntry[]>;
}

@State<TaskHistoryStateModel>({
  name: 'taskHistory',
  defaults: {
    history: new Map<string, TaskHistoryEntry[]>(),
  },
})
export class TaskHistoryState {

  @Selector()
  public static getHistory(state: TaskHistoryStateModel): Map<string, TaskHistoryEntry[]> {
    return state.history;
  }

  constructor(private taskHistoryEndpoint: TaskHistoryEndpoint) {}

  @Action(TaskAdded)
  public onTaskAdded(ctx: StateContext<TaskHistoryStateModel>, { payload }: TaskAdded) {

  }

  @Action(TaskUpdated)
  public onTaskUpdated(ctx: StateContext<TaskHistoryStateModel>, { payload }: TaskUpdated) {

  }

}
