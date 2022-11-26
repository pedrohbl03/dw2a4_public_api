import { ObjectId } from "mongoose";

export interface IUserService {
  add(userBody: any): Promise<any>;
  update(id: ObjectId, userBody: any): Promise<any>;
  delete(id: ObjectId): Promise<any>;
  get(id: ObjectId): Promise<any>;
  getAll(): Promise<any>;
}
