import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ILiked } from '../interface/liked.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class LikedDto implements ILiked {
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

export class CreateOrUpdateLikedDto extends OmitType(LikedDto, ['id',"user_id"]) {}
export class LikedIdDto extends PickType(LikedDto, ['id']) {}
