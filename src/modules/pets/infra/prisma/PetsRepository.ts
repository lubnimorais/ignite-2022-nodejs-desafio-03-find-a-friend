import { Pet, Prisma } from '@prisma/client';

import { prismaClient } from '@shared/infra/prisma';

import { IPetsRepository } from '@modules/pets/repositories/IPetsRepository';

class PetsRepository implements IPetsRepository {
  async create({
    name,
    description,
    energy_level,
    size,
    city,
    observations,
    ong_id,
  }: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prismaClient.pet.create({
      data: {
        name,
        description,
        energy_level,
        size,
        city,
        observations,
        ong_id,
      },
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    return prismaClient.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCity(city: string): Promise<Pet[]> {
    return prismaClient.pet.findMany({
      where: {
        city,
      },
    });
  }
}

export { PetsRepository };
