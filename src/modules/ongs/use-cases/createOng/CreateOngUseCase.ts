import { ONG } from '@prisma/client';

import { hash } from 'bcryptjs';

import { IOngsRepository } from '@modules/ongs/repositories/IOngsRepository';
import { OngAlreadyExistsError } from '../errors/OngAlreadyExistsError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  whatsapp_number: string;
  address: string;
  postal_code: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface IResponse {
  ong: ONG;
}

class CreateOngUseCase {
  constructor(private ongsRepository: IOngsRepository) {}

  public async execute({
    name,
    email,
    password,
    whatsapp_number,
    address,
    postal_code,
    state,
    city,
    latitude,
    longitude,
  }: IRequest): Promise<IResponse> {
    const ongExists = await this.ongsRepository.findByEmail(email);

    if (ongExists) {
      throw new OngAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const ong = await this.ongsRepository.create({
      name,
      email,
      password: passwordHash,
      whatsapp_number,
      address,
      postal_code,
      state,
      city,
      latitude,
      longitude,
    });

    return { ong };
  }
}

export { CreateOngUseCase };
