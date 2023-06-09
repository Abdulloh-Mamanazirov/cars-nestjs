import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex/knex.config';
import { CreateOrUpdateCarDto, CurrentUserDto } from './dto/car.dto';

@Injectable()
export class CarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  createCar(car: CreateOrUpdateCarDto) {
    const knex = this.knexConfig.instance;
    return knex('cars').insert(car);
  }

  getCars() {
    const knex = this.knexConfig.instance;
    const cars = knex.select('*').from('cars');
    return cars;
  }

  getCar(car) {
    const { id } = car;
    const knex = this.knexConfig.instance;
    const oneCar = knex
      .column(
        { company_id: 'co.id' },
        { company_title: 'co.title' },
        { company_image: 'co.image' },
        { car_id: 'ca.id' },
        { car_title: 'ca.title' },
        { car_side_image: 'ca.side_image' },
        { car_outside_image: 'ca.outside_image' },
        { car_inner_image: 'ca.inner_image' },
        { car_tinted: 'ca.tinted' },
        { car_color: 'ca.color' },
        { car_distance: 'ca.distance' },
        { car_gearbox: 'ca.gearbox' },
        { car_description: 'ca.description' },
      )
      .select()
      .from('cars as ca')
      .join('companies as co', 'co.id', 'ca.company_id')
      .where('ca.id', id);
    return oneCar;
  }

  deleteCar(car) {
    const { id } = car;
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked_cars').where('car_id', id).del();
      await trx('buy_cars').where('car_id', id).del();
      await trx('cars').where('id', id).del();
    });
  }

  updateCar(car, updatedCar) {
    const { id } = car;
    const knex = this.knexConfig.instance;
    return knex('cars').where({ id }).update(updatedCar);
  }
}
