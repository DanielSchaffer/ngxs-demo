import { Navigate } from '@ngxs/router-plugin';

export const AUTH_ROOT_PATH = 'auth';
export const AUTH_LOGIN_PATH = 'login';
export const AUTH_ORIGINAL_PATH_PARAM = 'originalPath';

export function getLoginRedirectAction(originalPath?: string): Navigate {
  return new Navigate([AUTH_ROOT_PATH, AUTH_LOGIN_PATH, { [AUTH_ORIGINAL_PATH_PARAM]: originalPath }]);
}
