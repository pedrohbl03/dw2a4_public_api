import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import { Types } from "mongoose";

import { config } from "../config/config";
import TokenTypes from "../constants/tokenTypes";
import {
  IToken,
  ITokenDocument,
  ITokenService,
  IUserDocument,
} from "../interfaces";
import { Token, User } from "../models";
import ApiError from "../utils/ApiError";

export class TokenService implements ITokenService {
  private async generateToken(
    userid: Types.ObjectId,
    expiresIn: Moment,
    type: string,
    secret = config.jwt?.secret as string
  ): Promise<string> {
    const payload = {
      sub: userid,
      iat: moment().unix(),
      exp: expiresIn.unix(),
      type,
    };

    return jwt.sign(payload, secret);
  }

  private async saveToken(
    token: string,
    userId: Types.ObjectId,
    expiresIn: Moment,
    type: string,
    blocklisted = false
  ): Promise<IToken> {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expiresIn.toDate(),
      type,
      blocklisted,
    });

    return tokenDoc;
  }

  public async generateAuthTokens(user: Partial<IUserDocument>): Promise<{
    accessToken: IToken;
    refreshToken: IToken;
  }> {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = await this.generateToken(
      user._id,
      accessTokenExpires,
      TokenTypes.ACESS
    );
    await this.saveToken(
      accessToken,
      user._id,
      accessTokenExpires,
      TokenTypes.REFRESH
    );


    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = await this.generateToken(
      user._id,
      refreshTokenExpires,
      TokenTypes.REFRESH
    );
    await this.saveToken(
      refreshToken,
      user._id,
      refreshTokenExpires,
      TokenTypes.REFRESH
    );

    return {
      accessToken: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refreshToken: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  public async verifyToken(
    token: string,
    type: string
  ): Promise<ITokenDocument> {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({
      token,
      user: payload.sub,
      type,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
    }

    return tokenDoc;
  }

  public async generateResetPasswordToken(email: string): Promise<string> {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const expires = moment().add(
      config.jwt.resetPasswordExpirationMinutes,
      "minutes"
    );

    const token = await this.generateToken(
      user._id,
      expires,
      TokenTypes.RESET_PASSWORD
    );

    this.saveToken(token, user._id, expires, TokenTypes.RESET_PASSWORD);

    return token;
  }
}
