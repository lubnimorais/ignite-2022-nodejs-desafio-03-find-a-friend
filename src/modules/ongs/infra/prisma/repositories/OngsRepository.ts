import { ONG, Prisma } from '@prisma/client';

import { prismaClient } from '@shared/infra/prisma';

import { IOngsRepository } from '../../../repositories/IOngsRepository';

class OngsRepository implements IOngsRepository {
  async create({
    name,
    email,
    password,
    postal_code,
    address,
    longitude,
    latitude,
    whatsapp_number,
    state,
    city,
  }: Prisma.ONGCreateInput): Promise<ONG> {
    const ong = await prismaClient.oNG.create({
      data: {
        name,
        email,
        password,
        postal_code,
        address,
        whatsapp_number,
        latitude,
        longitude,
        state,
        city,
      },
    });

    return ong;
  }

  async findByEmail(email: string): Promise<ONG | null> {
    return prismaClient.oNG.findFirst({
      where: {
        email,
      },
    });
  }
}

export { OngsRepository };
