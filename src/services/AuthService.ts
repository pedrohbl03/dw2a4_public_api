import httpStatus from "http-status";

import { UserService, TokenService } from ".";
import TokenTypes from "../constants/tokenTypes";
import { IAuthTokens, IUserDocument } from "../interfaces";
import { IAuthService } from "../interfaces/Auth";
import { Token } from "../models";
import ApiError from "../utils/ApiError";

export class AuthService implements IAuthService {
  constructor(
    private _userService: UserService,
    private _tokenService: TokenService
  ) {}

  public async refreshAuth(refreshToken: string): Promise<IAuthTokens> {
    const refreshTokenDoc = await this._tokenService.verifyToken(
      refreshToken,
      TokenTypes.REFRESH
    );

    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    }

    const user = await this._userService.get(refreshTokenDoc.user);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const authTokens = await this._tokenService.generateAuthTokens(user);

    return authTokens;
  }

  public async logout(refreshToken: string): Promise<any> {
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: TokenTypes.REFRESH,
    });

    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    }
    await refreshTokenDoc.remove();

    return {
      message: "Logout successful",
    };
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUserDocument> {
    const user = await this._userService.getUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
    }

    const isPasswordMatch = await user.isPasswordMatch(password);

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
    }

    return user;
  }

  public async resetPassword(token: string, newPassword: string): Promise<any> {
    try {
      const tokenDoc = await this._tokenService.verifyToken(
        token,
        TokenTypes.RESET_PASSWORD
      );

      const user = await this._userService.get(tokenDoc.user);

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }

      await this._userService.update(user._id, { password: newPassword });

      await Token.deleteMany({
        user: user._id,
        type: TokenTypes.RESET_PASSWORD,
      });
    } catch (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Password reset failed: ${error}`
      );
    }
  }
}
