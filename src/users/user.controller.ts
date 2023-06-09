import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { UserService } from './user.service';
import { AdminGuard, AuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUserDto, UpdateUserDto, UserIdDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

export const storage = {
  storage: diskStorage({
    destination: './uploads/users',
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  @UseGuards(AdminGuard)
  async getUsers() {
    let users = await this.userService.getUsers();
    return users;
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async getUser(@Param() user: UserIdDto) {
    return await this.userService.getUser(user);
  }

  @Get('/me')
  @UseGuards(AdminGuard)
  async getMe(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.getMe(user);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async updateUser(
    @Param() user: UserIdDto,
    @Body() updatedUser: UpdateUserDto,
    @UploadedFile() file,
  ) {
    return await this.userService.updateUser(user, file, updatedUser);
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param() user: UserIdDto) {
    return await this.userService.deleteUser(user);
  }

  @Delete('/deleteMe')
  @UseGuards(AuthGuard)
  async deleteMe(@CurrentUser() user: UserIdDto) {
    return await this.userService.deleteMe(user);
  }
}
