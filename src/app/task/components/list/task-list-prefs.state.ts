import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

import { SetPrefs } from './set-prefs.action';

export class TaskListPrefsStateModel {
  public showComplete: boolean;
}

@State<TaskListPrefsStateModel>({
  name: 'taskListPrefs',
  defaults: {
    showComplete: false,
  },
})
@Injectable()
export class TaskListPrefsState {

  @Selector()
  public static getPrefs(state: TaskListPrefsStateModel): TaskListPrefsStateModel {
    return state;
  }

  @Action(SetPrefs)
  public setPrefs(ctx: StateContext<TaskListPrefsStateModel>, { payload }: SetPrefs) {
    ctx.setState(patch(payload));
  }

}
