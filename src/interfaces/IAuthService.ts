export interface IAuthService {
  login(username: string, password: string): Promise<Partial<User>>;
  register(
    username: string,
    email: string,
    password: string
  ): Promise<Partial<User>>;
  refreshTokens(refreshToken: string): Promise<Partial<Token>>;
  logout(refreshToken: string): Promise<any>;
  forgotPassword(email: string): Promise<any>;
}
