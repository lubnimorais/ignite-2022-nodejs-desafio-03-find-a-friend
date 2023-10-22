import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';

function makeAuthenticateUserUseCase() {
  const usersRepository = new UsersRepository();

  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUserUseCase;
}

export { makeAuthenticateUserUseCase };
