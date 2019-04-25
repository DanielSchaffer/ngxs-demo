import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AUTH_ORIGINAL_PATH_PARAM } from '../../auth.routing-constants';

import { Login } from '../../login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public readonly loginForm: FormGroup;

  @HostBinding('class')
  public readonly cssClasses = 'col-6 offset-3';

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
    this.loginForm = this.createForm();
  }

  public login(form: FormGroup): void {
    this.store.dispatch(new Login(form.value));
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      originalPath: [this.route.snapshot.params[AUTH_ORIGINAL_PATH_PARAM]]
    });
  }

}
