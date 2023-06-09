import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IAuth } from '../interface/auth.interface';

export class UserDto implements IAuth {
  @ApiProperty({
    type: String
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Enter your name',
    default: 'Thomas Shelby',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Enter your email',
    default: 'thomas99@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Image',
    default: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    type: String,
    description: 'Enter your password',
    default: 'thomas1234',
  })
  @IsString()
  password: string;
}

export class RegisterDto extends OmitType(UserDto, ['id', 'image']) {}

export class LoginDto extends PickType(UserDto, [
  'email',
  'password',
]) {}
