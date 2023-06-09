import { IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ICompany } from '../interface/company.interface';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class CompanyDto implements ICompany {
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({
    type: String,
    default: 'Lamborghini',
  })
  @IsString()
  title: string;
  @ApiProperty({
    type: String,
    default: 'https://ford.prodealerwebsites.com.au/specials/default.png',
  })
  @IsString()
  image: string;
}

export class CreateOrUpdateCompanyDto extends OmitType(CompanyDto, ['id']) {}
export class CompanyIdDto extends PickType(CompanyDto, ['id']) {}
