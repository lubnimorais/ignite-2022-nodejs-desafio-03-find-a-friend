import { beforeEach, describe, expect, it } from 'vitest';

import { hash } from 'bcryptjs';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { InMemoryUserRepository } from '@modules/users/infra/repositories/in-memory/InMemoryUserRepository';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUserUseCase; // sut -> System under test

describe('Authenticate user use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@test.com';
    const password = '123456';

    await usersRepository.create({
      name: 'John Doe',
      email,
      password: await hash(password, 6),
    });

    const { user } = await sut.execute({
      email,
      password,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@test.com';
    const password = '123456';

    await usersRepository.create({
      name: 'John Doe',
      email,
      password: await hash(password, 6),
    });

    await expect(() =>
      sut.execute({
        email,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
