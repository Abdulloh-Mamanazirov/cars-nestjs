import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { KnexConfig } from 'src/knex/knex.config';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repo';
import { AuthService } from './auth.service';

@Module({
  imports:[JwtModule.register({
        global: true,
        secret: 'very_secret_key',
        signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService,AuthRepository,KnexConfig],
  controllers:[AuthController]
})
export class AuthModule {}
