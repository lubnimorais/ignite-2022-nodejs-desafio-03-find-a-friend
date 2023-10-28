import { Pet } from '@prisma/client';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';
import { IOngsRepository } from '@modules/ongs/repositories/IOngsRepository';
import { OngNotExistsError } from '../errors/OngNotExistsError';
import { IPetImagesRepository } from '@modules/pets/repositories/IPetImagesRepository';

interface Filename {
  filename: string;
  filepath?: string;
  type?: string;
  tasks?: null;
  id?: string;
}

interface IRequest {
  name: string;
  age: string;
  description: string;
  energy_level: number;
  size: string;
  observations: string[];
  ong_id: string;
  images: Filename[];
}

interface IResponse {
  pet: Pet;
}

class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private ongsRepository: IOngsRepository,
    private petImagesRepository: IPetImagesRepository,
  ) {}

  public async execute({
    name,
    age,
    description,
    energy_level,
    size,
    observations,
    ong_id,
    images,
  }: IRequest): Promise<IResponse> {
    const ong = await this.ongsRepository.findById(ong_id);

    if (!ong) {
      throw new OngNotExistsError();
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      description,
      energy_level,
      size,
      observations,
      ong_id,
    });

    for await (const image of images) {
      if (image.filename) {
        await this.petImagesRepository.create({
          pet_id: pet.id,
          image: image.filename,
        });
      }
    }

    return {
      pet,
    };
  }
}

export { CreatePetUseCase };
