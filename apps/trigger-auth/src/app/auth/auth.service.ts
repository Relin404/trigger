import { Response } from 'express';
import { LoginInput } from './dtos/login.input';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dtos/token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput, response: Response) {
    const user = await this.verifyUser(loginInput.email, loginInput.password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRATION'), 10)
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie & prevents XSS
      secure: this.configService.getOrThrow('NODE_ENV') === 'production', // Forces cookie to be sent only over HTTPS & prevents Man-in-the-Middle
      expires: expires,
    });

    return user;
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });

      const authenticated = await compare(password, user.password);
      if (!authenticated)
        throw new UnauthorizedException('Invalid credentials');

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
