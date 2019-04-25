import { User } from './user.model';

export class UserAuthorized {

  public static readonly type = '[Auth] User Authorized';

  constructor(public readonly payload: User) {}

}
