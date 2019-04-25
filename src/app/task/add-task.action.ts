import { Task } from './task.model';

export class AddTask {

  public static readonly type = '[Task] Add';

  constructor(public payload: Task) {}

}
