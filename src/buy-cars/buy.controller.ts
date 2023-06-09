import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BuyCarService } from './buy.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import {
  CreateOrUpdateBuyDto,
  CurrentUserDto,
} from './dto/buy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('buy')
@Controller('buy')
@UseGuards(AuthGuard)
export class BuyCarController {
  constructor(private buyService: BuyCarService) {}

  @Get('/list')
  async getBuyingCarsOfAllUsers() {
    return await this.buyService.getBuyingCarsOfAllUsers();
  }

  @Get('/my')
  async getMyBuyCars(@CurrentUser() user: CurrentUserDto) {
    return await this.buyService.getMyBuyCars(user);
  }

  @Post('/save')
  async createBuyCar(
    @Body() car: CreateOrUpdateBuyDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.buyService.createBuyCar(car, user);
  }

  @Delete('/delete')
  async deleteBuyCar(@Body() car: CreateOrUpdateBuyDto) {
    return await this.buyService.deleteBuyCar(car);
  }
}
