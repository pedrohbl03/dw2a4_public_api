import { Moment } from "moment";

import { Token, User } from "../../models";

export interface ITokenService {
  generateToken(
    userid: string,
    secret: string,
    expiresIn: Moment,
    type: string
  ): string;
  generateAuthTokens(user: User): string;
  verifyToken(token: string, type: string): any;
  saveToken(
    token: string,
    userId: string,
    expiresIn: Moment,
    type: string
  ): Promise<Token>;
  generateResetPasswordToken(email: string): string;
}
