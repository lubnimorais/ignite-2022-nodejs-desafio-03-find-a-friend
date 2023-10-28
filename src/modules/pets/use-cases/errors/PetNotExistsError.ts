class PetNotExistsError extends Error {
  constructor() {
    super('Pet not found');
  }
}

export { PetNotExistsError };
