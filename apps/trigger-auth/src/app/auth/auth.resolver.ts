import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlContext } from '@trigger/nestjs';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/login.input';
import { User } from '../users/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext
  ) {
    return this.authService.login(loginInput, context.res);
  }
}
