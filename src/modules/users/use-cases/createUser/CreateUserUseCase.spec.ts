import { beforeEach, describe, expect, it } from 'vitest';

import { CreateUserUseCase } from './CreateUserUseCase';
import { InMemoryUserRepository } from '@modules/users/infra/repositories/in-memory/InMemoryUserRepository';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';

let userRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe('Create user use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it('should be able to create a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to create user with same email twice', async () => {
    const email = 'johndoe@test.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
