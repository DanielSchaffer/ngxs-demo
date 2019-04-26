import { Injectable } from '@angular/core';

export const AUTH_ROOT_PATH = 'auth';
export const AUTH_LOGIN_PATH = 'login';
export const AUTH_ORIGINAL_PATH_PARAM = 'originalPath';

@Injectable()
export class AuthRoutingConstants {

  public getLoginUrl(originalPath: string): any[] {
    return [AUTH_ROOT_PATH, AUTH_LOGIN_PATH, { [AUTH_ORIGINAL_PATH_PARAM]: originalPath }];
  }

}
