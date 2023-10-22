import { User } from '@prisma/client';

import { compare } from 'bcryptjs';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}

export { AuthenticateUserUseCase };
