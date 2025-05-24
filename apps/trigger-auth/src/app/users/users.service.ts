import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/trigger-auth/src/app/prisma/prisma.service';
import { Prisma } from '@prisma-clients/trigger-auth';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    // Logic to create a user
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10), // Hash the password before saving
      },
    });
  }

  async getUsers() {
    // Logic to retrieve users
    return this.prismaService.user.findMany();
  }
}
