import { PetsRepository } from '@modules/pets/infra/prisma/PetsRepository';
import { ShowPetUseCase } from '../shoPet/ShowPetUseCase';

function makeShowPetUseCase() {
  const petsRepository = new PetsRepository();

  const showPetUseCase = new ShowPetUseCase(petsRepository);

  return showPetUseCase;
}

export { makeShowPetUseCase };
