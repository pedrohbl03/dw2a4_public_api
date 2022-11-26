import { IUserService } from "../interfaces/services/IUserService";
import User, { IUserDocument } from "../models/User";

export class UserService implements IUserService {
  async add(user: IUserDocument): Promise<any> {
    const { name, email, password } = user;

    if (await User.isEmailTaken(email)) {
      throw new Error("Email is already taken");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return newUser;
  }

  async update(id: string, user: User): Promise<any> { }

  async delete(id: string): Promise<any> { }

  async get(id: string): Promise<any> { }

  async getAll(): Promise<any> { }
}
