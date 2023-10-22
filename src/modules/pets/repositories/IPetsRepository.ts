import { Pet, Prisma } from '@prisma/client';

interface IPetsRepository {
  create({
    name,
    description,
    energy_level,
    size,
    city,
    observations,
    ong_id,
  }: Prisma.PetCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByCity(city: string): Promise<Pet[]>;
}

export { IPetsRepository };
