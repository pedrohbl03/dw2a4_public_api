import { User } from "../models";

export interface IUserService {
  add(user: User): Promise<Partial<User>>;
  update(id: string, user: User): Promise<Partial<User>>;
  delete(id: string): Promise<Partial<User>>;
  get(id: string): Promise<Partial<User>>;
  getAll(): Promise<Partial<User>[]>;
}
