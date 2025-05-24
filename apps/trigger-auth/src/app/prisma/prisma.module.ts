import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/trigger-auth/src/app/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
