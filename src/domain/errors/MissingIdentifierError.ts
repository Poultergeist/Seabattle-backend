export class MissingIdentifierError extends Error {
  constructor(message: string = 'Missing identifier') {
    super(message);
    this.name = 'MissingIdentifierError';
    Object.setPrototypeOf(this, MissingIdentifierError.prototype);
  }
}
