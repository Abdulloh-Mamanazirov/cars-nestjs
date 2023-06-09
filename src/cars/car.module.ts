import { Module } from '@nestjs/common';
import { KnexModule } from 'src/knex/knex.module';
import { CarController } from './car.controller';
import { CarRepository } from './car.repo';
import { CarService } from './car.service';

@Module({
  imports: [KnexModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
