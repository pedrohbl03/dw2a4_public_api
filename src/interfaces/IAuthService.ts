export interface IAuthService {
  login(username: string, password: string): Promise<any>;
  register(username: string, email: string, password: string): Promise<any>;
  refreshTokens(refreshToken: string): Promise<any>;
  logout(refreshToken: string): Promise<any>;
  forgotPassword(email: string): Promise<any>;
}
