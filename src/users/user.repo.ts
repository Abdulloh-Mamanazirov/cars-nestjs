import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex/knex.config';

@Injectable()
export class UserRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getUsers() {
    const knex = this.knexConfig.instance;
    const users = knex.select('*').from('users');
    return users;
  }

  getUser(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const oneUser = knex.select('*').from('users').where({ id });
    return oneUser;
  }

  getMe(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const oneUser = knex.select('*').from('users').where({ id });
    return oneUser;
  }

  deleteUser(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked_cars').where('user_id', id).del();
      await trx('buy_cars').where('user_id', id).del();
      await trx('users').where('id', id).del();
    });
  }

  deleteMe(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked_cars').where('user_id', id).del();
      await trx('buy_cars').where('user_id', id).del();
      await trx('users').where('id', id).del();
    });
  }

  updateUser(user, updatedUser) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    return knex('users').where({ id }).update(updatedUser);
  }
}
