import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthRepository } from './auth.repo';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  async register(user) {
    await this.authRepo.register(user);
    return {
      msg: 'Registered',
    };
  }

  async login(user) {
    let admin = await this.authRepo.getOne(user);
    
    if (admin.length > 0) {
      let token = this.jwt.sign({ id: admin[0].id, role:"admin" });
      return {       
        msg: 'Logged In',
        token,
        admin: true,
      };
    }
    
    let res = await this.authRepo.login(user);
    if (res.length === 0) throw new NotFoundException();
    let token = this.jwt.sign({ id: res[0].id });
    return {
      msg: 'Logged In',
      token,
    };
  }
}
