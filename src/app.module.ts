import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthRepository } from './auth/auth.repo';
import { KnexModule } from './knex/knex.module';
import { CompanyModule } from './company/company.module';
import { CompanyController } from './company/company.controller';
import { CompanyRepository } from './company/company.repo';
import { CompanyService } from './company/company.service';
import { CarModule } from './cars/car.module';
import { CarController } from './cars/car.controller';
import { CarService } from './cars/car.service';
import { CarRepository } from './cars/car.repo';
import { LikedCarModule } from './like-cars/liked.module';
import { LikedCarController } from './like-cars/liked.controller';
import { LikedCarService } from './like-cars/liked.service';
import { LikedCarRepository } from './like-cars/liked.repo';
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserRepository } from './users/user.repo';
import { BuyCarModule } from './buy-cars/buy.module';
import { BuyCarController } from './buy-cars/buy.controller';
import { BuyCarService } from './buy-cars/buy.service';
import { BuyCarRepository } from './buy-cars/buy.repo';

@Module({
  imports: [AuthModule, KnexModule, UserModule, CompanyModule, CarModule, LikedCarModule, BuyCarModule],
  controllers: [
    AuthController,
    CompanyController,
    CarController,
    LikedCarController,
    UserController,
    BuyCarController,
  ],
  providers: [
    AuthService,
    AuthRepository,
    CompanyService,
    CompanyRepository,
    CarService,
    CarRepository,
    LikedCarService,
    LikedCarRepository,
    UserService,
    UserRepository,
    BuyCarService,
    BuyCarRepository,
  ],
})
export class AppModule {}
