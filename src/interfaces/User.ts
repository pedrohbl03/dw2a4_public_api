import { Document, Model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserService {
  add(userBody: any): Promise<any>;
  update(id: Types.ObjectId, userBody: Partial<IUserDocument>): Promise<any>;
  delete(id: Types.ObjectId): Promise<any>;
  get(id: Types.ObjectId): Promise<any>;
  getAll(): Promise<any>;
  getUserByEmail(email: string): Promise<IUser>;
}
