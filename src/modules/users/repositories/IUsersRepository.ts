import { Prisma, User } from '@prisma/client';

interface IUsersRepository {
  create({ name, email, password }: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export { IUsersRepository };
