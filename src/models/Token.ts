export class Token {
  acessToken: string;

  refreshToken: string;

  userId: string;

  createdAt: Date;

  constructor({ acessToken, refreshToken, userId }: Token) {
    this.acessToken = acessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.createdAt = new Date();
  }
}
