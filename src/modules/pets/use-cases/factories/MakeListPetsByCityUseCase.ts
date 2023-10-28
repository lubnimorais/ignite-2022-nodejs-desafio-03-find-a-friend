import { PetsRepository } from '@modules/pets/infra/prisma/PetsRepository';
import { ListPetsByCityUseCase } from '../listPetByCity/ListPetsByCityUseCase';

function makeListPetsByCityUseCase() {
  const petsRepository = new PetsRepository();

  const listPetsByCityUseCase = new ListPetsByCityUseCase(petsRepository);

  return listPetsByCityUseCase;
}

export { makeListPetsByCityUseCase };
