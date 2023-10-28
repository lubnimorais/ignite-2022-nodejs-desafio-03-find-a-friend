import { User } from '@prisma/client';

import { hash } from 'bcryptjs';

import { prismaClient } from '@shared/infra/prisma';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hash(password, 6);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { user };
  }
}

export { CreateUserUseCase };
