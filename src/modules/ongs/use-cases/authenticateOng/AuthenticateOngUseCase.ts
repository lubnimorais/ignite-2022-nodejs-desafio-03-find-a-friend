import { ONG } from '@prisma/client';

import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

import { IOngsRepository } from '@modules/ongs/repositories/IOngsRepository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  ong: ONG;
}

class AuthenticateOngUseCase {
  constructor(private ongsRepository: IOngsRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const ong = await this.ongsRepository.findByEmail(email);

    if (!ong) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, ong.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return { ong };
  }
}

export { AuthenticateOngUseCase };
