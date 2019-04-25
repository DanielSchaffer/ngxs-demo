import { User } from './user.model';

export interface LoginAttempt extends User {
  originalPath?: string;
}
