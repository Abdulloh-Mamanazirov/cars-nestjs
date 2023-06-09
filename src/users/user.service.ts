import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(user) {
    return await this.userRepository.getUser(user);
  }

  async getMe(user) {
    return await this.userRepository.getMe(user);
  }

  async deleteUser(user) {
    let getOne = await this.userRepository.getUser(user);
    if (!getOne[0]) {
      return {
        msg: 'User was not found!',
      };
    }
    await this.userRepository.deleteUser(user);

    return {
      msg: 'User was deleted!',
    };
  }

  async deleteMe(user) {
    let getOne = await this.userRepository.getUser(user);
    if (!getOne[0]) {
      return {
        msg: 'User was not found!',
      };
    }
    await this.userRepository.deleteMe(user);

    return {
      msg: 'Your account was deleted!',
    };
  }

  async updateUser(user,file, updatedUser) {
    let getOne = await this.userRepository.getUser(user);
    if (!getOne[0]) {
      return {
        msg: 'User was not found!',
      };
    }

    updatedUser.email = updatedUser.email ? updatedUser.email : getOne[0].email
    updatedUser.image = file ? file.filename : getOne[0].image
    updatedUser.name = updatedUser.name ? updatedUser.name : getOne[0].name
    updatedUser.password = updatedUser.password ? updatedUser.password : getOne[0].password
    
    await this.userRepository.updateUser(user, updatedUser);
    return {
      msg: 'User was updated!',
    };
  }
}
