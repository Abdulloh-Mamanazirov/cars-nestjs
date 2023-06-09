import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from 'src/knex/knex.config';
import { CreateOrUpdateCompanyDto, CurrentUserDto } from './dto/company.dto';

@Injectable()
export class CompanyRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  createCompany(company: CreateOrUpdateCompanyDto) {
    const knex = this.knexConfig.instance;
    const { title, image } = company;
    return knex('companies').insert({ title, image });
  }

  getCompanies() {
    const knex = this.knexConfig.instance;
    const companies = knex.select('*').from('companies');
    return companies;
  }

  getCompany(company) {
    const { id } = company;
    const knex = this.knexConfig.instance;
    const oneCompany = knex.select('*').from('companies').where({ id });
    return oneCompany;
  }

  getCompanyCars(company) {
    const { id } = company;
    const knex = this.knexConfig.instance;
    const oneCompanyCars = knex
      .column(
        { company_id: 'co.id' },
        { company_title: 'co.title' },
        { company_image: 'co.image' },
        { car_id: 'ca.id' },
        { car_title: 'ca.title' },
        { car_side_image: 'ca.side_image' },
        { car_outside_image: 'ca.outside_image' },
        { car_inner_image: 'ca.inner_image' },
        { car_tinted: 'ca.tinted' },
        { car_color: 'ca.color' },
        { car_distance: 'ca.distance' },
        { car_gearbox: 'ca.gearbox' },
        { car_description: 'ca.description' },
      )
      .select()
      .from('companies as co')
      .join('cars as ca', 'co.id', 'ca.company_id')
      .where('co.id', id);
    return oneCompanyCars;
  }

  deleteCompany(company) {
    const { id } = company;
    const knex = this.knexConfig.instance;
    return knex.transaction(async (trx) => {
      await trx('liked_cars')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('company_id', id);
        })
        .del();
      await trx('buy_cars')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('company_id', id);
        })
        .del();
      await trx('cars').where('company_id', id).del();
      await trx('companies').where('id', id).del();
    });
  }

  updateCompany(company, updatedCompany) {
    const { id } = company;
    const knex = this.knexConfig.instance;
    return knex('companies').where({ id }).update(updatedCompany);
  }
}
