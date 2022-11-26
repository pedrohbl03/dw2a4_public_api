import { IAuthService } from "../interfaces/IAuthService";

export class AuthService implements IAuthService {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async refreshTokens(refreshToken: string): Promise<Partial<Token>> {
    throw new Error("Method not implemented.");
  }

  async logout(refreshToken: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async login(username: string, password: string): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async forgotPassword(email: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
