import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryPetsRepository } from '@modules/pets/infra/repositories/in-memory/InMemoryPetsRepositories';
import { ShowPetUseCase } from './ShowPetUseCase';

let petsRepository: InMemoryPetsRepository;
let sut: ShowPetUseCase;

describe('Show Pet Details Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new ShowPetUseCase(petsRepository);
  });

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 'cub',
      energy_level: 2,
      size: 'medium',
      independence: 'low',
      ong_id: 'org-01',
    });

    const { pet } = await sut.execute({
      id: createdPet.id,
    });

    expect(pet.name).toEqual('Pet example');
  });
});
