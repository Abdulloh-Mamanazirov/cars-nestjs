import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { CompanyService } from './company.service';
import { AdminGuard, AuthGuard } from 'src/auth/guard/auth.guard';
import {
  CreateOrUpdateCompanyDto,
  CompanyIdDto,
} from './dto/company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private companieService: CompanyService) {}

  @Get('/all')
  async getCompanies() {
    let companies = await this.companieService.getCompanies();
    return companies;
  }

  @Get('/:id')
  async getCompany(@Param() company: CompanyIdDto) {
    return await this.companieService.getCompany(company);
  }

  @Get('/cars/:id')
  async getCompanyCars(@Param() company: CompanyIdDto) {
    return await this.companieService.getCompanyCars(company);
  }

  @Post('/create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async createCompany(
    @Body() company: CreateOrUpdateCompanyDto,
    @UploadedFile() file,
  ): Promise<any> {
    company.image = file.filename;
    return await this.companieService.createCompany(company);
  }

  @Put('/update/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async updateCompany(
    @Param() companyId: CompanyIdDto,
    @Body() updatedCompany: CreateOrUpdateCompanyDto,
    @UploadedFile() file,
  ) {
    let oldCompany = await this.companieService.getCompany(companyId)
    updatedCompany.image = file ? file.filename : oldCompany[0].image;
    updatedCompany.title = updatedCompany.title ? updatedCompany.title : oldCompany[0].title;

    return await this.companieService.updateCompany(companyId, updatedCompany);
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard)
  async deleteCompany(@Param() company: CompanyIdDto) {
    return await this.companieService.deleteCompany(company);
  }
}
