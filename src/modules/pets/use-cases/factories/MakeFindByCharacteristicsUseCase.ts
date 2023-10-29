import { PetsRepository } from '@modules/pets/infra/repositories/prisma/PetsRepository';
import { FindByCharacteristicsUseCase } from '../findByCharacteristics/FindByCharacteristicsUseCase';

function makeFindByCharacteristicsUseCase() {
  const petsRepository = new PetsRepository();

  const findByCharacteristicsUseCase = new FindByCharacteristicsUseCase(
    petsRepository,
  );

  return findByCharacteristicsUseCase;
}

export { makeFindByCharacteristicsUseCase };
