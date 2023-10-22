import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

function makeCreateUserUseCase() {
  const usersRepository = new UsersRepository();

  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}

export { makeCreateUserUseCase };
