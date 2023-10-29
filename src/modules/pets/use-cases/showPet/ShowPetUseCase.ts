import { Pet } from '@prisma/client';

import { PetNotExistsError } from '../errors/PetNotExistsError';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  pet: Pet;
}

class ShowPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new PetNotExistsError();
    }

    return { pet };
  }
}

export { ShowPetUseCase };
