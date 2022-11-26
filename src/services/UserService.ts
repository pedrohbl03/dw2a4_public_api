import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService {
  async add(user: User): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, user: User): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async get(id: string): Promise<Partial<User>> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<Partial<User>[]> {
    throw new Error("Method not implemented.");
  }
}
