class OngNotExistsError extends Error {
  constructor() {
    super('ONG not found');
  }
}

export { OngNotExistsError };
