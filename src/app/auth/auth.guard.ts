import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthRoutingConstants } from './auth.routing-constants';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private store: Store, private routingConstants: AuthRoutingConstants) {}

  public canActivateChild(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(state => state.auth.user)
      .pipe(map(user => {
        if (user === undefined) {
          return this.routingConstants.getLoginUrl(routerState.url);
        }
        return true;
      }));
  }

}
