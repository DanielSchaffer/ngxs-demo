import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthRoutingConstants } from './auth.routing-constants';
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

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private routingContants: AuthRoutingConstants,
  ) {}

  @Action(Login)
  public login(ctx: StateContext<AuthStateModel>, { payload }: Login) {
    const user = { username: payload.username };
    ctx.patchState({
      user,
    });

    ctx.dispatch(new UserAuthorized(user));

    this.redirectToOriginalPath(payload);
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: undefined,
    });

    this.redirectToLogin();
  }

  private redirectToOriginalPath(login: LoginAttempt) {
    if (login.originalPath) {
      // TODO: replace with @ngxs/router-plugin
      this.ngZone.run(() => this.router.navigateByUrl(login.originalPath));
    }
  }

  private redirectToLogin() {
    // TODO: replace with @ngxs/router-plugin
    this.ngZone.run(() => this.router.navigateByUrl(this.routingContants.getLoginUrl(this.router.routerState.snapshot.url)));
  }

}
