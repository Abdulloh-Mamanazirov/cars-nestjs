import { Module } from '@nestjs/common';
import { KnexModule } from 'src/knex/knex.module';
import { LikedCarController } from './liked.controller';
import { LikedCarRepository } from './liked.repo';
import { LikedCarService } from './liked.service';

@Module({
  imports: [KnexModule],
  controllers: [LikedCarController],
  providers: [LikedCarService, LikedCarRepository],
})
export class LikedCarModule {}
