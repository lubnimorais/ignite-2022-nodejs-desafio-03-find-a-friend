import { OngsRepository } from '@modules/ongs/infra/prisma/repositories/OngsRepository';
import { PetsRepository } from '@modules/pets/infra/prisma/PetsRepository';
import { CreatePetUseCase } from '../createPet/CreatePetUseCase';

function makeCreatePetUseCase() {
  const petsRepository = new PetsRepository();
  const ongsRepositoru = new OngsRepository();

  const createPetUseCase = new CreatePetUseCase(petsRepository, ongsRepositoru);

  return createPetUseCase;
}

export { makeCreatePetUseCase };
