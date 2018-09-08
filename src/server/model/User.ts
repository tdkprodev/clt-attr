import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

/** Import IUser interface for User model */
import { IUser } from '@shared/user';

@Entity()
export class User extends BaseEntity implements IUser {
  /** Check whether the user is a valid User */
  static isValid(user: any): user is User {
    if (!user.firstName) throw new Error('NO_FIRSTNAME');
    if (!user.lastName) throw new Error('NO_LASTNAME');

    return true;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', default: '' })
  public firstName: string;

  @Column({ type: 'varchar', default: '' })
  public lastName: string;
}