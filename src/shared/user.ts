import { Omit } from '@shared/omit'

export interface IUser {
  deletedAt: Date | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verification?: string;
  gender: 'Male' | 'Female' | 'Not Specified';
}

export interface ISanitizedUser
  extends Omit<IUser, 'password' | 'verification'> { }
