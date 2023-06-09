import { Injectable } from '@nestjs/common';
import knex from 'knex';
import { dbConfig } from 'src/sql/psql';

@Injectable()
export class KnexConfig {
  instance: any;
  constructor() {
    this.instance = knex(dbConfig);
  }
}
