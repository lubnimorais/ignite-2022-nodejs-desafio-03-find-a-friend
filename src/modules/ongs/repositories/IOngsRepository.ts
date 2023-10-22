import { Prisma, ONG } from '@prisma/client';

interface IOngsRepository {
  create({
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
  }: Prisma.ONGCreateInput): Promise<ONG>;
  findByEmail(email: string): Promise<ONG | null>;
}

export { IOngsRepository };
