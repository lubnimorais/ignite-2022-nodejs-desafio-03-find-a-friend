import { OngsRepository } from '@modules/ongs/infra/prisma/repositories/OngsRepository';

import { CreateOngUseCase } from '../createOng/CreateOngUseCase';

function makeCreateOngUseCase() {
  const ongsRepository = new OngsRepository();
  const createOngUseCase = new CreateOngUseCase(ongsRepository);

  return createOngUseCase;
}

export { makeCreateOngUseCase };
