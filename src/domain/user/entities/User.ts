export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public readonly id?: number,
    public token?: string,
  ) {}
}
