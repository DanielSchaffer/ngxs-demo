import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Logout } from './logout.action';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public readonly authUser$: Observable<User>;

  constructor(private store: Store) {
    this.authUser$ = this.store.select(state => state.auth.user);
  }

  public logOut(): void {
    this.store.dispatch(new Logout());
  }

}
