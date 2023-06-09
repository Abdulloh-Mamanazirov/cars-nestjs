import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { CarService } from './car.service';
import { AdminGuard, AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateOrUpdateCarDto, CarIdDto } from './dto/car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('cars')
@Controller('cars')
@UseGuards(AuthGuard)
export class CarController {
  constructor(private carService: CarService) {}

  @Get('/all')
  async getCars() {
    let cars = await this.carService.getCars();
    return cars;
  }

  @Get('/:id')
  async getCar(@Param() car: CarIdDto) {
    return await this.carService.getCar(car);
  }

  @Post('/create')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'side', maxCount: 1 },
        { name: 'outside', maxCount: 1 },
        { name: 'inner', maxCount: 1 },
      ],
      storage,
    ),
  )
  async createCar(
    @Body() car: CreateOrUpdateCarDto,
    @UploadedFiles() files,
  ): Promise<any> {
    car.side_image = files.side[0].filename;
    car.inner_image = files.inner[0].filename;
    car.outside_image = files.outside[0].filename;
    return await this.carService.createCar(car);
  }

  @Put('/update/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'side', maxCount: 1 },
        { name: 'inner', maxCount: 1 },
        { name: 'outside', maxCount: 1 },
      ],
      storage,
    ),
  )
  async updateCar(
    @Param() carId: CarIdDto,
    @Body() updatedCar: CreateOrUpdateCarDto,
    @UploadedFiles() files,
  ) {
    return await this.carService.updateCar(carId, updatedCar, files);
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard)
  async deleteCar(@Param() car: CarIdDto) {
    return await this.carService.deleteCar(car);
  }
}
