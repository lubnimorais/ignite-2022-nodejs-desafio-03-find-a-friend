import { Pet } from '@prisma/client';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

interface IRequest {
  city: string;
  page: number;
}

interface IResponse {
  pets: Pet[];
}

class ListPetsByCityUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  public async execute({ city, page }: IRequest): Promise<IResponse> {
    const pets = await this.petsRepository.findByCity(city, page);

    return {
      pets,
    };
  }
}

export { ListPetsByCityUseCase };
