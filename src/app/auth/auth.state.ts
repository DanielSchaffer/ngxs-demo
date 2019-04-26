import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { getLoginRedirectAction } from './auth.routing-constants';
import { LoginAttempt } from './login-attempt.model';
import { Login } from './login.action';
import { Logout } from './logout.action';
import { UserAuthorized } from './user-authorized.action';
import { User } from './user.model';

export class AuthStateModel {
  public user: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class AuthState {

  @Selector()
  static getUser(state: AuthStateModel): User {
    return state.user;
  }

  constructor(private router: Router) {}

  @Action(Login)
  public login(ctx: StateContext<AuthStateModel>, { payload }: Login) {
    const user = { username: payload.username };
    ctx.patchState({
      user,
    });

    ctx.dispatch(new UserAuthorized(user));

    this.redirectToOriginalPath(ctx, payload);
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: undefined,
    });

    this.redirectToLogin(ctx);
  }

  private redirectToOriginalPath(ctx: StateContext<AuthStateModel>, login: LoginAttempt) {
    if (login.originalPath) {
      ctx.dispatch(new Navigate([login.originalPath]));
    }
  }

  private redirectToLogin(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(getLoginRedirectAction(this.router.routerState.snapshot.url));
  }

}
