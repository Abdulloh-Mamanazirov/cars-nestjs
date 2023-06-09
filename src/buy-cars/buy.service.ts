import { Injectable } from '@nestjs/common';
import { BuyCarRepository } from './buy.repo';
import { CreateOrUpdateBuyDto } from './dto/buy.dto';

@Injectable()
export class BuyCarService {
  constructor(private likedRepository: BuyCarRepository) {}

  async getBuyingCarsOfAllUsers() {
    return await this.likedRepository.getBuyingCarsOfAllUsers();
  }

  async getMyBuyCars(user) {
    return await this.likedRepository.getMyBuyCars(user);
  }

  async createBuyCar(car: CreateOrUpdateBuyDto, user) {
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

    await this.likedRepository.createBuyCar(car, user);
    return {
      msg: 'Car was added to cart!',
    };
  }

  async deleteBuyCar(data) {
    let getOne = await this.likedRepository.getOne(data.car_id);
    if (!getOne[0]) {
      return {
        msg: 'Car was not found!',
      };
    }
    await this.likedRepository.deleteBuyCar(data);

    return {
      msg: 'Car was deleted!',
    };
  }
}
