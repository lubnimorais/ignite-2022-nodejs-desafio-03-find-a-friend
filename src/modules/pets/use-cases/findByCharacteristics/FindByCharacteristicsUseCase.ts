import { Pet } from '@prisma/client';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

interface FindByCharacteristicsRequest {
  age?: string;
  energy?: number;
  independence?: string;
  size?: string;
  city: string;
}

interface FindByCharacteristicsResponse {
  pets: Pet[];
}

export class FindByCharacteristicsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
    city,
  }: FindByCharacteristicsRequest): Promise<FindByCharacteristicsResponse> {
    const pets = await this.petsRepository.findByCharacteristics({
      age,
      energy,
      independence,
      size,
      city,
    });

    return {
      pets,
    };
  }
}
