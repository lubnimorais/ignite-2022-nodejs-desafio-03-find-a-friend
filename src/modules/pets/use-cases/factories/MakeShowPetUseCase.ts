import { PetsRepository } from '@modules/pets/infra/repositories/prisma/PetsRepository';
import { ShowPetUseCase } from '../showPet/ShowPetUseCase';

function makeShowPetUseCase() {
  const petsRepository = new PetsRepository();

  const showPetUseCase = new ShowPetUseCase(petsRepository);

  return showPetUseCase;
}

export { makeShowPetUseCase };
