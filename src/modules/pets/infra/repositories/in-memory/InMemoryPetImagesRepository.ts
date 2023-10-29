import { randomUUID } from 'node:crypto';
import { PetImages, Prisma } from '@prisma/client';
import { PetImagesRepository } from '../prisma/PetImagesRepository';

class InMemoryPetImagesRepository implements PetImagesRepository {
  public items: PetImages[] = [];

  async create({
    image,
    pet_id,
  }: Prisma.PetImagesUncheckedCreateInput): Promise<PetImages> {
    const petGallery = {
      id: randomUUID(),
      image,
      pet_id,
      created_at: new Date(),
    };

    this.items.push(petGallery);

    return petGallery;
  }
}

export { InMemoryPetImagesRepository };
