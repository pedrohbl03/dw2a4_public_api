import { Document, Types } from "mongoose";

import { IUserDocument } from "./User";

export interface ITokenDocument extends Document {
  token: string;
  expires: Date;
  user: Types.ObjectId;
  type: string;
  blocklisted: boolean;
}

export interface IToken {
  token: string;
  expires: Date;
}

export interface IAuthTokens {
  accessToken: IToken;
  refreshToken: IToken;
}

export interface ITokenService {
  generateAuthTokens(user: IUserDocument): Promise<{
    accessToken: IToken;
    refreshToken: IToken;
  }>;
  verifyToken(token: string, type: string): any;
  generateResetPasswordToken(email: string): Promise<string>;
}
