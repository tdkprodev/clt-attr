import { Omit } from '@shared/omit'

export interface IUser {
  firstName: string;
  lastName: string;
  // password: string;
  // verification?: string;
}

/** IMPLEMENT LATER
 * 
 * export interface ISanitizedUser extends Omit<IUser, 'password' | 'verification'>{}
 */