import { randomUUID } from 'node:crypto';

import { Prisma, ONG } from '@prisma/client';

import { IOngsRepository } from '@modules/ongs/repositories/IOngsRepository';

class InMemoryOngsRepository implements IOngsRepository {
  public itens: ONG[] = [];

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
    const ong = {
      id: randomUUID(),
      name,
      email,
      password,
      postal_code,
      address,
      longitude: new Prisma.Decimal(longitude.toString()),
      latitude: new Prisma.Decimal(latitude.toString()),
      whatsapp_number,
      state,
      city,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.itens.push(ong);

    return ong;
  }

  async findByEmail(email: string): Promise<ONG | null> {
    const ong = this.itens.find((item) => item.email === email);

    if (!ong) {
      return null;
    }

    return ong;
  }

  async findById(id: string): Promise<ONG | null> {
    const ong = this.itens.find((item) => item.id === id);

    if (!ong) {
      return null;
    }

    return ong;
  }
}

export { InMemoryOngsRepository };
