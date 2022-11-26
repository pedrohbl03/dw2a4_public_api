import { Moment } from "moment";

export interface ITokenService {
  generateToken(
    userid: string,
    secret: string,
    expiresIn: Moment,
    type: string
  ): string;
  generateAuthTokens(user: any): string;
  verifyToken(token: string, type: string): any;
  saveToken(
    token: string,
    userId: string,
    expiresIn: Moment,
    type: string
  ): Promise<any>;
  generateResetPasswordToken(email: string): string;
}
