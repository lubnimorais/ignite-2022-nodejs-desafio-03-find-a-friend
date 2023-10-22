import { Pet } from '@prisma/client';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { IOngsRepository } from '@modules/ongs/repositories/IOngsRepository';
import { OngNotExistsError } from '../errors/OngNotExistesError';

interface IRequest {
  name: string;
  description: string;
  energy_level: number;
  size: string;
  city: string;
  observations: string[];
  ong_id: string;
}

interface IResponse {
  pet: Pet;
}

class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private ongsRepositoru: IOngsRepository,
  ) {}

  public async execute({
    name,
    description,
    energy_level,
    size,
    city,
    observations,
    ong_id,
  }: IRequest): Promise<IResponse> {
    const ong = await this.ongsRepositoru.findById(ong_id);

    if (!ong) {
      throw new OngNotExistsError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      energy_level,
      size,
      city,
      observations,
      ong_id,
    });

    return {
      pet,
    };
  }
}

export { CreatePetUseCase };
