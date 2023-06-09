import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex/knex.config';
import { CreateOrUpdateBuyDto, CurrentUserDto } from './dto/buy.dto';

@Injectable()
export class BuyCarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  checkCar(id) {
    const knex = this.knexConfig.instance;
    const car = knex.select('*').from('cars').where({ id });
    return car;
  }

  checkUser(id) {
    const knex = this.knexConfig.instance;
    const user = knex.select('*').from('users').where({ id });
    return user;
  }

  getOne(car_id) {
    const knex = this.knexConfig.instance;
    const buyCar = knex.select('*').from('buy_cars').where({ car_id });
    return buyCar;
  }

  getBuyingCarsOfAllUsers() {
    const knex = this.knexConfig.instance;
    const buyCars = knex
      .column(
        { buy_id: 'l.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.image' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.outside_image' },
      )
      .select()
      .from('buy_cars as l')
      .join('users as u', 'l.user_id', 'u.id')
      .join('cars as c', 'c.id', 'l.car_id');

    return buyCars;
  }

  getMyBuyCars(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const myBuyCar = knex
      .column(
        { buy_id: 'l.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.image' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.outside_image' },
      )
      .select()
      .from('buy_cars as l')
      .join('users as u', 'l.user_id', 'u.id')
      .join('cars as c', 'c.id', 'l.car_id')
      .where('u.id', id);
    return myBuyCar;
  }

  createBuyCar(car: CreateOrUpdateBuyDto, user: CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex('buy_cars').insert({ user_id: user.id, car_id: car.car_id });
  }

  deleteBuyCar(data) {
    const { car_id } = data;
    const knex = this.knexConfig.instance;
    return knex('buy_cars').where({ car_id }).del();
  }
}
