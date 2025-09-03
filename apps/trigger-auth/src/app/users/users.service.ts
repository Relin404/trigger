import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/trigger-auth';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    // Logic to create a user
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    // Logic to retrieve users
    return this.prismaService.user.findMany();
  }

  async getUser(query: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: query,
    });
  }
}
