import { PetImages, Prisma } from '@prisma/client';

interface IPetImagesRepository {
  create({
    pet_id,
    image,
  }: Prisma.PetImagesUncheckedCreateInput): Promise<PetImages>;
}

export { IPetImagesRepository };
