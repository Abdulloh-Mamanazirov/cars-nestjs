import { Module } from '@nestjs/common';
import { KnexModule } from 'src/knex/knex.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [KnexModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
