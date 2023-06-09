import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IBuy } from '../interface/buy.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class BuyDto implements IBuy {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  car_id: string;
}

export class CreateOrUpdateBuyDto extends OmitType(BuyDto, ['id',"user_id"]) {}
export class BuyIdDto extends PickType(BuyDto, ['id']) {}
