import { Controller } from '@nestjs/common';
import { ApiTags,ApiResponse } from '@nestjs/swagger';
import { Body, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/authDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Registered successfully!' })
  @ApiResponse({ status: 400, description: 'Something went wrong!' })
  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }
  
  @ApiResponse({ status: 201, description: 'Logged in successfully!' })
  @ApiResponse({ status: 400, description: 'Something went wrong!' })
  @Post('/login')
  async login(@Body() user:LoginDto) {
    return await this.authService.login(user);
  }
}
