import { beforeEach, describe, expect, it } from 'vitest';

import { CreateOngUseCase } from './CreateOngUseCase';
import { InMemoryOngsRepository } from '@modules/ongs/infra/repositories/in-memory/InMemoryOngsRepository';
import { OngAlreadyExistsError } from '../errors/OngAlreadyExistsError';

let ongsRepository: InMemoryOngsRepository;
let sut: CreateOngUseCase;

describe('Create ong use case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository();
    sut = new CreateOngUseCase(ongsRepository);
  });

  it('should be able to create a ong', async () => {
    const { ong } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      whatsapp_number: '123456789',
      address: 'Street 1',
      postal_code: '12345-123',
      state: 'State 1',
      city: 'City 1',
      latitude: 1,
      longitude: 1,
    });

    expect(ong.id).toEqual(expect.any(String));
  });

  it('should not be able to create user with same email twice', async () => {
    const email = 'johndoe@test.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      whatsapp_number: '123456789',
      address: 'Street 1',
      postal_code: '12345-123',
      state: 'State 1',
      city: 'City 1',
      latitude: 1,
      longitude: 1,
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        whatsapp_number: '123456789',
        address: 'Street 1',
        postal_code: '12345-123',
        state: 'State 1',
        city: 'City 1',
        latitude: 1,
        longitude: 1,
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError);
  });
});
