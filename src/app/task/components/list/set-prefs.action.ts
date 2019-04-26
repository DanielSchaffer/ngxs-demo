import { TaskListPrefsStateModel } from './task-list-prefs.state';

export class SetPrefs {

  public static readonly type = '[TaskListPrefs] Set';

  constructor(public readonly payload: Partial<TaskListPrefsStateModel>) {}

}
