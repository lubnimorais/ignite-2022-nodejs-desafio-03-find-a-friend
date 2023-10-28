import { randomUUID } from 'node:crypto';
import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class InMemoryUserRepository implements IUsersRepository {
  public itens: User[] = [];

  public async create({
    name,
    email,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.itens.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}

export { InMemoryUserRepository };
