import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryPetsRepository } from '@modules/pets/infra/repositories/in-memory/InMemoryPetsRepositories';
import { FindByCharacteristicsUseCase } from './FindByCharacteristicsUseCase';

let petsRepository: InMemoryPetsRepository;
let sut: FindByCharacteristicsUseCase;

describe('Find Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FindByCharacteristicsUseCase(petsRepository);
  });

  it('should return pets with the specified characteristics in a city', async () => {
    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      age: 'Adult',
      energy_level: 4,
      size: 'Small',
      independence: 'High',
      ong_id: 'org-id',
    });

    await petsRepository.create({
      name: 'Test Pet',
      description: 'Test description',
      age: 'Puppy',
      energy_level: 4,
      size: 'Small',
      independence: 'High',
      ong_id: 'org-id',
    });

    const { pets } = await sut.execute({
      city: 'City Test - CT',
      age: 'Puppy',
      energy: 4,
      size: 'Small',
      independence: 'High',
    });

    expect(pets).toEqual([
      expect.objectContaining({
        age: 'Puppy',
        energy_level: 4,
        size: 'Small',
        independence: 'High',
      }),
    ]);
  });
});
