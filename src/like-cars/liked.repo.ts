import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex/knex.config';
import { CreateOrUpdateLikedDto, CurrentUserDto } from './dto/liked.dto';

@Injectable()
export class LikedCarRepository {
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
    const likedcar = knex.select('*').from('liked_cars').where({ car_id });
    return likedcar;
  }

  getLikedCarsOfAllUsers() {
    const knex = this.knexConfig.instance;
    const likedCars = knex
      .column(
        { liked_id: 'l.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.image' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.outside_image' },
      )
      .select()
      .from('liked_cars as l')
      .join('users as u', 'l.user_id', 'u.id')
      .join('cars as c', 'c.id', 'l.car_id');

    return likedCars;
  }

  getMyLikedCars(user) {
    const { id } = user;
    const knex = this.knexConfig.instance;
    const myLikedCars = knex
      .column(
        { liked_id: 'l.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.image' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.outside_image' },
      )
      .select()
      .from('liked_cars as l')
      .join('users as u', 'l.user_id', 'u.id')
      .join('cars as c', 'c.id', 'l.car_id')
      .where('u.id', id);
    return myLikedCars;
  }

  createLikedCar(car: CreateOrUpdateLikedDto, user:CurrentUserDto) {
    const knex = this.knexConfig.instance;
    return knex('liked_cars').insert({user_id:user.id,car_id:car.car_id});
  }

  deleteLikedCar(data) {
    const { car_id } = data;
    const knex = this.knexConfig.instance;
    return knex('liked_cars').where({ car_id }).del();
  }
}
