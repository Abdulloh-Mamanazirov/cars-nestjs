import { Module } from '@nestjs/common';
import { KnexModule } from 'src/knex/knex.module';
import { BuyCarController } from './buy.controller';
import { BuyCarRepository } from './buy.repo';
import { BuyCarService } from './buy.service';

@Module({
  imports: [KnexModule],
  controllers: [BuyCarController],
  providers: [BuyCarService, BuyCarRepository],
})
export class BuyCarModule {}
