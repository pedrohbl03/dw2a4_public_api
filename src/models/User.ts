import { Token } from "./Token";

export class User {
  name: string;

  email: string;

  password: string;

  tokens: Token;

  constructor({ name, email, password, tokens }: User) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.tokens = tokens;
  }
}
