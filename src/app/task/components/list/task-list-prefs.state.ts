import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext, Store, createSelector } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { map, tap } from 'rxjs/operators';

import { User } from '../../../auth/user.model';

import { SetPrefs } from './set-prefs.action';

export interface TaskListUserPrefs {
  showComplete: boolean;

}

export interface TaskListPrefsStateModel {
  [user: string]: TaskListUserPrefs;
}

@State<TaskListPrefsStateModel>({
  name: 'taskListPrefs',
  defaults: {},
})
@Injectable()
export class TaskListPrefsState {

  @Selector()
  public static getUserPrefs() {
    return createSelector([Store], (store: any) => {
      if (!store.auth || !store.auth.user) {
        return undefined;
      }
      return store.taskListPrefs[store.auth.user.username] || {};
    });
  }

  constructor(private store: Store) {}

  @Action(SetPrefs)
  public setPrefs(ctx: StateContext<TaskListPrefsStateModel>, { payload }: SetPrefs) {
    return this.store.selectOnce(store => store.auth.user)
      .pipe(tap(user => {
        const value: any = ctx.getState()[user.username] ? patch(payload) : payload;
        ctx.setState(patch({
          [user.username]: value,
        }));
      }));
  }

}
