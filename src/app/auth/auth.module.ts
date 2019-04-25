import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthRoutingConstants } from './auth.routing-constants';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';
import { LoginComponent } from './components/login/login.component';
import { AuthDisplayComponent } from './components/auth-display/auth-display.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthDisplayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      AuthState,
    ]),
    AuthRoutingModule,
  ],
  providers: [
    AuthGuard,
    AuthRoutingConstants,
    AuthService,
  ],
  exports: [
    AuthDisplayComponent
  ]
})
export class AuthModule { }
