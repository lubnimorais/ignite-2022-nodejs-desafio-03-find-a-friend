import { OngsRepository } from '@modules/ongs/infra/repositories/prisma/OngsRepository';
import { PetsRepository } from '@modules/pets/infra/prisma/PetsRepository';
import { PetImagesRepository } from '@modules/pets/infra/prisma/PetImagesRepository';

import { CreatePetUseCase } from '../createPet/CreatePetUseCase';

function makeCreatePetUseCase() {
  const petsRepository = new PetsRepository();
  const ongsRepository = new OngsRepository();
  const petImagesRepository = new PetImagesRepository();

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    ongsRepository,
    petImagesRepository,
  );

  return createPetUseCase;
}

export { makeCreatePetUseCase };
