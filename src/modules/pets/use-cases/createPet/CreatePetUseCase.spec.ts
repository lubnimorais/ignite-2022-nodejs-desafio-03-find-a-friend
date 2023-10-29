import { beforeEach, describe, expect, it } from 'vitest';

import { CreatePetUseCase } from './CreatePetUseCase';

import { InMemoryOngsRepository } from '@modules/ongs/infra/repositories/in-memory/InMemoryOngsRepository';
import { InMemoryPetsRepository } from '@modules/pets/infra/repositories/in-memory/InMemoryPetsRepositories';
import { InMemoryPetImagesRepository } from '@modules/pets/infra/repositories/in-memory/InMemoryPetImagesRepository';

import { OngNotExistsError } from '../errors/OngNotExistsError';

let petsRepository: InMemoryPetsRepository;
let ongsRepository: InMemoryOngsRepository;
let petImagesRepository: InMemoryPetImagesRepository;
let sut: CreatePetUseCase;

describe('Create pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    ongsRepository = new InMemoryOngsRepository();
    petImagesRepository = new InMemoryPetImagesRepository();
    sut = new CreatePetUseCase(
      petsRepository,
      ongsRepository,
      petImagesRepository,
    );
  });

  it('should be able to create a user', async () => {
    const ong = await ongsRepository.create({
      id: 'org-01',
      name: 'Org Example',
      email: 'org@example.com',
      password: '123456',
      address: 'address',
      postal_code: '99999-999',
      whatsapp_number: '(99) 99999-9999',
      state: 'PE',
      city: 'Caruaru',
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const imagesData = [
      {
        filename: 'image1.jpg',
        filepath: '/path/to/image1.jpg',
        type: 'jpg',
        tasks: null,
        id: '1',
      },
      {
        filename: 'image2.jpg',
        filepath: '/path/to/image2.jpg',
        type: 'jpg',
        tasks: null,
        id: '2',
      },
    ];

    const { pet } = await sut.execute({
      name: 'Caramelo',
      age: 'Filhote',
      description: 'Muito carinhoso',
      energy_level: 3,
      size: 'Médio',
      observations: ['Lugares abertos para brincar'],
      ong_id: ong.id,
      images: imagesData,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it('should not be able to create user with same email twice', async () => {
    const imagesData = [
      {
        filename: 'image1.jpg',
        filepath: '/path/to/image1.jpg',
        type: 'jpg',
        tasks: null,
        id: '1',
      },
      {
        filename: 'image2.jpg',
        filepath: '/path/to/image2.jpg',
        type: 'jpg',
        tasks: null,
        id: '2',
      },
    ];

    await expect(() =>
      sut.execute({
        name: 'Caramelo',
        age: 'Filhote',
        description: 'Muito carinhoso',
        energy_level: 3,
        size: 'Médio',
        observations: ['Lugares abertos para brincar'],
        ong_id: 'not-exists-ong-id',
        images: imagesData,
      }),
    ).rejects.toBeInstanceOf(OngNotExistsError);
  });
});
