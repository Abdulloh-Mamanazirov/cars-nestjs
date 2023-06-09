import { Module } from '@nestjs/common';
import { KnexModule } from 'src/knex/knex.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repo';
import { CompanyService } from './company.service';

@Module({
  imports: [KnexModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository]
})
export class CompanyModule {}
