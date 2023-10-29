import { Pet, Prisma, ONG } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import {
  IPetsRepository,
  FindByCharacteristicsParams,
} from '@modules/pets/repositories/IPetsRepository';

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];

  async create({
    name,
    age,
    description,
    energy_level,
    size,
    independence,
    ong_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name,
      age: age ?? '',
      description,
      energy_level: new Prisma.Decimal(energy_level.toString()),
      size,
      observations: [],
      independence: independence ?? '',
      ong_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findByCharacteristics({
    age,
    energy,
    independence,
    size,
  }: FindByCharacteristicsParams): Promise<Pet[]> {
    const energyDecimal = new Prisma.Decimal(energy!.toString());

    return this.items.filter((item) => {
      return (
        item.age === age &&
        item.energy_level === energyDecimal &&
        item.independence === independence &&
        item.size === size
      );
    });
  }

  async findByCity(city: string, page: number): Promise<Pet[]> {
    return [...this.items].slice((page - 1) * 20, 20);
  }
}
