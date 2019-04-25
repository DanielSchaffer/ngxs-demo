import { LoginAttempt } from './login-attempt.model';

export class Login {
  public static readonly type = '[Auth] Login';

  public constructor(public payload: LoginAttempt) {}
}
