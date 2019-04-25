import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

export const AUTH_ROOT_PATH = 'auth';
export const AUTH_LOGIN_PATH = 'login';
export const AUTH_ORIGINAL_PATH_PARAM = 'originalPath';

@Injectable()
export class AuthRoutingConstants {

  constructor(private router: Router) {}

  public getLoginUrl(originalPath: string): UrlTree {
    return this.router.parseUrl(`${AUTH_ROOT_PATH}/${AUTH_LOGIN_PATH};${AUTH_ORIGINAL_PATH_PARAM}=${encodeURIComponent(originalPath)}`);
  }

}
