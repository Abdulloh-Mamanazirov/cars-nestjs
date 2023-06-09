import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {

    @Inject() 
    private readonly jwtService: JwtService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let token = request.headers.authorization || request.headers.token;
      
      
      if (!token) {
        throw new UnauthorizedException();
      }
      
      try {
        if (token.startsWith('Bearer ')) {
          token = token.substr('Bearer '.length);
        }
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        throw new UnauthorizedException();
      }

      const decodeToken = await this.jwtService.decode(token);
      
      if (!decodeToken) {
        throw new UnauthorizedException();
      }
      request.user = decodeToken;
      
      return true;
    }
}

@Injectable()
export class AdminGuard implements CanActivate {

    @Inject() 
    private readonly jwtService: JwtService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let token = request.headers.authorization || request.headers.token;
      
      
      if (!token) {
        throw new UnauthorizedException();
      }
      
      try {
        if (token.startsWith('Bearer ')) {
          token = token.substr('Bearer '.length);
        }
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        throw new UnauthorizedException();
      }

      const decodeToken = await this.jwtService.decode(token);
      
      if (!decodeToken) {
        throw new UnauthorizedException();
      }
      request.user = decodeToken;

      if(request.user.role !== 'admin') throw new UnauthorizedException();
      
      return true;
    }
}