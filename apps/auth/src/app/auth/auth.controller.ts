import { Controller, UseGuards } from '@nestjs/common';
import { TokenPayload } from './dtos/token-payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from '@trigger/types/proto/auth';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.usersService.getUser({ id: request.user.userId });
  }
}
