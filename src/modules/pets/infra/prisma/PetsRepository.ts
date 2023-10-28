import { Pet, Prisma } from '@prisma/client';

import { prismaClient } from '@shared/infra/prisma';

import {
  FindByCharacteristicsParams,
  IPetsRepository,
} from '@modules/pets/repositories/IPetsRepository';

class PetsRepository implements IPetsRepository {
  async create({
    name,
    age,
    description,
    energy_level,
    size,
    observations,
    ong_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prismaClient.pet.create({
      data: {
        name,
        age,
        description,
        energy_level,
        size,
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

  async findByCity(city: string, page: number): Promise<Pet[]> {
    return prismaClient.pet.findMany({
      where: {
        ong: {
          city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async findByCharacteristics({
    age,
    energy,
    independence,
    size,
    city,
  }: FindByCharacteristicsParams) {
    const pet = await prismaClient.pet.findMany({
      where: {
        age: {
          contains: age || '',
        },

        energy_level: energy ? { equals: energy } : undefined,

        independence: {
          contains: independence || '',
        },

        size: {
          contains: size || '',
        },

        ong: {
          city: {
            contains: city,
          },
        },
      },
    });

    return pet;
  }
}

export { PetsRepository };
