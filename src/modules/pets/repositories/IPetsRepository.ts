import { Pet, Prisma } from '@prisma/client';

export interface FindByCharacteristicsParams {
  age?: string;
  energy?: number;
  size?: string;
  independence?: string;
  city: string;
}

interface IPetsRepository {
  create({
    name,
    age,
    description,
    energy_level,
    size,
    observations,
    independence,
    ong_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByCity(city: string, page: number): Promise<Pet[]>;
  findByCharacteristics({
    age,
    energy,
    size,
    independence,
    city,
  }: FindByCharacteristicsParams): Promise<Pet[]>;
}

export { IPetsRepository };
