import jwt from "jsonwebtoken";
import { Moment } from "moment";

import config from "../config/config";
import { ITokenService } from "../interfaces";
import { Token } from "../models";

export class TokenService implements ITokenService {
  async generateToken(
    userid: string,
    secret: string,
    expiresIn: Moment,
    type: string
  ): string {
    throw new Error("Method not implemented.");
  }

  async generateAuthTokens(user: User): string {
    throw new Error("Method not implemented.");
  }

  async verifyToken(token: string, type: string) {
    throw new Error("Method not implemented.");
  }

  async saveToken(
    token: string,
    userId: string,
    expiresIn: Moment,
    type: string
  ): Promise<Token> {
    throw new Error("Method not implemented.");
  }

  async generateResetPasswordToken(email: string): string {
    throw new Error("Method not implemented.");
  }
}
