import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

import { Logout } from '../../logout.action';
import { User } from '../../user.model';

@Component({
  selector: 'app-auth-display',
  templateUrl: './auth-display.component.html',
  styleUrls: ['./auth-display.component.scss']
})
export class AuthDisplayComponent {

  public readonly user$: Observable<User>;

  @HostBinding('class')
  public readonly cssClasses = 'row';

  constructor(private auth: AuthService) {
    this.user$ = this.auth.authUser$;
  }

  public logOut(): void {
    this.auth.logOut();
  }

}
