import { compare, hashSync } from 'bcryptjs'; // For hashing password.
// import { merge, omit } from 'ramda'; // For merging objects
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import { sign, verify } from '@server/jwt';
import { IUser, ISanitizedUser } from '@shared/user';
import { config } from '@shared/config';

@Entity()
export class User extends BaseEntity implements IUser {
  /** Check whether the user is a valid User */
  static isValid(user: any): user is User {
    if (!user.email) throw new Error('NO_EMAIL');
    if (!user.firstName) throw new Error('NO_FIRSTNAME');
    if (!user.lastName) throw new Error('NO_LASTNAME');

    return true;
  }

  /** Verify a token using jwt and query for a user if the token is valid */
  static fromToken(token: string) {
    const json = verify(token) as User;

    if (json) {
      return User.findOne(json.id, {
        where: { deletedAt: null },
      });
    }
    return null;
  }

  /** Generates a token using jwt */
  public generateToken() {
    return sign({ id: this.id });
  }

  // Use bcryptjs compare method to compare the passwords.
  public checkPassword(attemptedPassword: string) {
    return compare(attemptedPassword, this.password)
  }

  // public sanitize(): ISanitizedUser {
  //   return omit<User>(
  //     ['password', 'verification'],
  //     merge(this, {
  //       user: this.user,
  //     }),
  //   ) as ISanitizedUser;
  // }

  constructor() {
    super();
    // Create a hash
    const hash = hashSync(String(Date.now()), config.VERIFICATION_DIFFICULTY)
      .split('$')
      .pop();

    if (hash) {
      this.verification = hash.replace(/\//g, '-');
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date', default: () => 'NULL', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'varchar', default: '' })
  public firstName: string;

  @Column({ type: 'varchar', default: '' })
  public lastName: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', default: 'Not Specified' })
  public gender: 'Male' | 'Female' | 'Not Specified';

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar', default: '' })
  public verification: string;
}