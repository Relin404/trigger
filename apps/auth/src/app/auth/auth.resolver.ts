import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlContext } from '@trigger/graphql';
import { AuthService } from 'apps/auth/src/app/auth/auth.service';
import { LoginInput } from 'apps/auth/src/app/auth/dtos/login.input';
import { User } from 'apps/auth/src/app/users/models/user.model';

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
