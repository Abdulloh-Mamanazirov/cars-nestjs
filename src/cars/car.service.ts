import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CarRepository } from './car.repo';
import { CreateOrUpdateCarDto, CurrentUserDto } from './dto/car.dto';

@Injectable()
export class CarService {
  constructor(
    private carRepository: CarRepository,
    private jwt: JwtService,
  ) {}

  async getCars() {
    return await this.carRepository.getCars();
  }

  async getCar(car) {
    return await this.carRepository.getCar(car);
  }

  async createCar(car: CreateOrUpdateCarDto) {
    await this.carRepository.createCar(car);
    return {
      msg: 'Car was created!',
    };
  }

  async deleteCar(car) {
    let getOne = await this.carRepository.getCar(car);
    if (!getOne[0]) {
      return {
        msg: 'Car was not found!',
      };
    }
    await this.carRepository.deleteCar(car);

    return {
      msg: 'Car was deleted!',
    };
  }

  async updateCar(car, updatedCar, files) {
    let getOne = await this.carRepository.getCar(car);
    if (!getOne[0]) {
      return {
        msg: 'Car was not found!',
      };
    }

    updatedCar.company_id = updatedCar.company_id ? updatedCar.company_id : getOne[0].company_id
    updatedCar.title = updatedCar.title ? updatedCar.title : getOne[0].car_title
    updatedCar.tinted = updatedCar.tinted ? updatedCar.tinted : getOne[0].car_tinted
    updatedCar.color = updatedCar.color ? updatedCar.color : getOne[0].car_color
    updatedCar.distance = updatedCar.distance ? updatedCar.distance : getOne[0].car_distance
    updatedCar.gearbox = updatedCar.gearbox ? updatedCar.gearbox : getOne[0].car_gearbox
    updatedCar.description = updatedCar.description ? updatedCar.description : getOne[0].car_description 
    updatedCar.side_image = files.side ? files.side[0].filename : getOne[0].car_side_image
    updatedCar.outside_image = files.outside ? files.outside[0].filename : getOne[0].car_outside_image
    updatedCar.inner_image = files.inner ? files.inner[0].filename : getOne[0].car_inner_image

    await this.carRepository.updateCar(car, updatedCar);
    return {
      msg: 'Car was updated!',
    };
  }
}
