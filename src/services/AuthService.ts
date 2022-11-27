import { UserService, TokenService } from ".";
import TokenTypes from "../constants/tokenTypes";
import { IAuthTokens, IUserDocument } from "../interfaces";
import { IAuthService } from "../interfaces/Auth";
import { Token } from "../models";

const _userService = new UserService();
const _tokenService = new TokenService();
export class AuthService implements IAuthService {
  async refreshAuth(refreshToken: string): Promise<IAuthTokens> {
    const refreshTokenDoc = await _tokenService.verifyToken(
      refreshToken,
      TokenTypes.REFRESH
    );

    if (!refreshTokenDoc) {
      throw new Error("Invalid token");
    }

    const user = await _userService.get(refreshTokenDoc.user);

    if (!user) {
      throw new Error("User not found");
    }

    const authTokens = await _tokenService.generateAuthTokens(user);

    return authTokens;
  }

  async logout(refreshToken: string): Promise<any> {
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: TokenTypes.REFRESH,
    });

    if (!refreshTokenDoc) {
      throw new Error("Invalid token");
    }
    await refreshTokenDoc.remove();

    return {
      message: "Logout successful",
    };
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUserDocument> {
    const user = await _userService.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await user.isPasswordMatch(password);

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    try {
      const tokenDoc = await _tokenService.verifyToken(
        token,
        TokenTypes.RESET_PASSWORD
      );

      const user = await _userService.get(tokenDoc.user);

      if (!user) {
        throw new Error("User not found");
      }

      _userService.update(user._id, { password: newPassword });

      await Token.deleteMany({
        user: user._id,
        type: TokenTypes.RESET_PASSWORD,
      });
    } catch (error) {
      throw new Error(`Password reset failed: ${error}`);
    }
  }
}
