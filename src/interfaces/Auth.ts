import { IAuthTokens, IUserDocument } from ".";

export interface IAuthService {
  loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUserDocument>;
  refreshAuth(refreshToken: string): Promise<IAuthTokens>;
  logout(refreshToken: string): Promise<any>;
  resetPassword(token: string, newPassword: string): Promise<any>;
}
