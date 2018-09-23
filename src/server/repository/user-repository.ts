/** User repository for querying users */
import { User } from '@server/model/user';
import { merge } from 'ramda';
import { Brackets, FindManyOptions, FindOneOptions } from 'typeorm';

export class UserRepository {
  public find(options?: FindManyOptions<User>) {
    return User.find(merge({}, options));
  }

  public findOneById(id: number) {
    return this.find({
      where: { id },
    });
  }
}


















