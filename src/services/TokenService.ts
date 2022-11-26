import jwt  from 'jsonwebtoken';
import { Moment } from 'moment';
import { ITokenService } from '../interfaces';
import config from '../config/config';

export class TokenService implements ITokenService {
  generateToken(userid: string, secret: string, expiresIn: Moment, type: string): string {
    throw new Error('Method not implemented.');
  }
  generateAuthTokens(user: User): string {
    throw new Error('Method not implemented.');
  }
  verifyToken(token: string, type: string) {
    throw new Error('Method not implemented.');
  }
  saveToken(token: string, userId: string, expiresIn: Moment, type: string): Promise<Token> {
    throw new Error('Method not implemented.');
  }
  generateResetPasswordToken(email: string): string {
    throw new Error('Method not implemented.');
  }
}
