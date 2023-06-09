import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikedCarService } from './liked.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateOrUpdateLikedDto,CurrentUserDto, LikedIdDto } from './dto/liked.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('liked')
@Controller('liked')
@UseGuards(AuthGuard)
export class LikedCarController {
  constructor(private likedService: LikedCarService) {}

  @Get('/all')
  async getLikedCarsOfAllUsers() {
    let likedcars = await this.likedService.getLikedCarsOfAllUsers();
    return likedcars;
  }

  @Get('/my')
  async getMyLikedCars(@CurrentUser() user: CurrentUserDto) {
    return await this.likedService.getMyLikedCars(user);
  }

  @Post('/save')
  async createLikedCar(
    @Body() car: CreateOrUpdateLikedDto,
    @CurrentUser() user: CurrentUserDto
  ) {
    return await this.likedService.createLikedCar(car,user);
  }

  @Delete('/delete')
  async deleteLikedCar(@Body() car: CreateOrUpdateLikedDto) {
    return await this.likedService.deleteLikedCar(car);
  }
}