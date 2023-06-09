import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyRepository } from './company.repo';
import { CreateOrUpdateCompanyDto, CurrentUserDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private jwt: JwtService
  ) {}

  async getCompanies() {
    return await this.companyRepository.getCompanies();
  }

  async getCompany(company) {
    return await this.companyRepository.getCompany(company);
  }

  async getCompanyCars(company) {
    return await this.companyRepository.getCompanyCars(company);
  }

  async createCompany(company: CreateOrUpdateCompanyDto) {    
    await this.companyRepository.createCompany(company);
    return {
      msg: 'Company was created!',
    };
  }

  async deleteCompany(company) {
    let getOne = await this.companyRepository.getCompany(company);
    if (!getOne[0]) {
      return {
        msg: 'Company was not found!',
      };
    }
    await this.companyRepository.deleteCompany(company);

    return {
      msg: 'Company was deleted!',
    };
  }

  async updateCompany(company, updatedCompany) {
    let getOne = await this.companyRepository.getCompany(company);
    if (!getOne[0]) {
      return {
        msg: 'Company was not found!',
      };
    }

    await this.companyRepository.updateCompany(company, updatedCompany);
    return {
      msg: 'Company was updated!',
    };
  }
}
