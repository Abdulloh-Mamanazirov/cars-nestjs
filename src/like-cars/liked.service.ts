import { Injectable } from '@nestjs/common';
import { LikedCarRepository } from './liked.repo';
import { CreateOrUpdateLikedDto } from './dto/liked.dto';

@Injectable()
export class LikedCarService {
  constructor(
    private likedRepository: LikedCarRepository,
  ) {}

  async getLikedCarsOfAllUsers() {
    return await this.likedRepository.getLikedCarsOfAllUsers();
  }

  async getMyLikedCars(user) {
    return await this.likedRepository.getMyLikedCars(user);
  }

  async createLikedCar(car: CreateOrUpdateLikedDto,user) {
    let getOne = await this.likedRepository.checkCar(car.car_id);
    if (!getOne[0]) {
      return {
        msg: 'Car was not found!',
      };
    }

    let getUser = await this.likedRepository.checkUser(user.id);
    if (!getUser[0]) {
      return {
        msg: 'User was not found!',
      };
    }

    await this.likedRepository.createLikedCar(car,user);
    return {
      msg: 'Car was saved!',
    };
  }

  async deleteLikedCar(data) {
    let getOne = await this.likedRepository.getOne(data.car_id);
    if (!getOne[0]) {
      return {
        msg: 'Car was not found!'
      };
    }
    await this.likedRepository.deleteLikedCar(data);

    return {
      msg: 'Car was deleted!',
    };
  }
}
