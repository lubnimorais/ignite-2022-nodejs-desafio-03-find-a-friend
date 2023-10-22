import { Prisma, User } from '@prisma/client';

import { prismaClient } from '@shared/infra/prisma';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  async create({
    name,
    email,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }
}

export { UsersRepository };
