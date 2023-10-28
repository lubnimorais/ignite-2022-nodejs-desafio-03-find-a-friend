import { beforeEach, describe, expect, it } from 'vitest';

import { AuthenticateOngUseCase } from './AuthenticateOngUseCase';
import { InMemoryOngsRepository } from '@modules/ongs/infra/repositories/in-memory/InMemoryOngsRepository';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

let ongsRepository: InMemoryOngsRepository;
let sut: AuthenticateOngUseCase; // sut -> System under test

describe('Authenticate ong use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository();
    sut = new AuthenticateOngUseCase(ongsRepository);
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@test.com';
    const password = '123456';

    await ongsRepository.create({
      name: 'Test',
      email,
      password,
      postal_code: '55000000',
      address: 'Ruta test',
      latitude: -27.2092052,
      longitude: -49.6401091,
      whatsapp_number: '81912311212',
      state: 'PE',
      city: 'Caruaru',
    });

    const { ong } = await sut.execute({
      email,
      password,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(ong.id).toEqual(expect.any(String));
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

    await ongsRepository.create({
      name: 'Test',
      email,
      password,
      postal_code: '55000000',
      address: 'Ruta test',
      latitude: -27.2092052,
      longitude: -49.6401091,
      whatsapp_number: '81912311212',
      state: 'PE',
      city: 'Caruaru',
    });

    await expect(() =>
      sut.execute({
        email,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
