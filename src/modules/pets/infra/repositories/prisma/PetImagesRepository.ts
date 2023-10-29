import { PetImages, Prisma } from '@prisma/client';

import { prismaClient } from '@shared/infra/prisma';

import { IPetImagesRepository } from '@modules/pets/repositories/IPetImagesRepository';

class PetImagesRepository implements IPetImagesRepository {
  public async create({
    pet_id,
    image,
  }: Prisma.PetImagesUncheckedCreateInput): Promise<PetImages> {
    const petImage = await prismaClient.petImages.create({
      data: {
        pet_id,
        image,
      },
    });

    return petImage;
  }
}

export { PetImagesRepository };
