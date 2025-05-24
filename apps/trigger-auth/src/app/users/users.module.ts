import { Module } from '@nestjs/common';
import { PrismaModule } from 'apps/trigger-auth/src/app/prisma/prisma.module';
import { UsersResolver } from 'apps/trigger-auth/src/app/users/users.resolver';
import { UsersService } from 'apps/trigger-auth/src/app/users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
