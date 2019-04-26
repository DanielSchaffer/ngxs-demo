import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getLoginRedirectAction } from './auth.routing-constants';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private store: Store) {}

  public canActivateChild(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(state => state.auth.user)
      .pipe(map(user => {
        if (user === undefined) {
          this.store.dispatch(getLoginRedirectAction(routerState.url));
          return false;
        }
        return true;
      }));
  }

}
