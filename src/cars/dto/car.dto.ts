import { IsString,IsNumber,IsBoolean } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICar } from '../interface/car.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class CarDto implements ICar {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  side_image: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  outside_image: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  inner_image: string;
  
  @ApiProperty({
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  tinted: boolean;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  year: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  color: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  price: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  gearbox: string;
  
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  distance: number;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  company_id: string;
}

export class CreateOrUpdateCarDto extends OmitType(CarDto, ['id']) {}
export class CarIdDto extends PickType(CarDto, ['id']) {}
