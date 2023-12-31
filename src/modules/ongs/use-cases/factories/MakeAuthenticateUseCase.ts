import { OngsRepository } from '@modules/ongs/infra/repositories/prisma/OngsRepository';

import { AuthenticateOngUseCase } from '../authenticateOng/AuthenticateOngUseCase';

function makeAuthenticateUseCase() {
  const ongsRepository = new OngsRepository();

  const authenticateUseCase = new AuthenticateOngUseCase(ongsRepository);

  return authenticateUseCase;
}

export { makeAuthenticateUseCase };
