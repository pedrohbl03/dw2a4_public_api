import { Types } from "mongoose";

import { IUserService, IUser, IUserDocument } from "../interfaces/User";
import User from "../models/User";

export class UserService implements IUserService {
  async add(userBody: IUser): Promise<any> {
    const { name, email, password } = userBody;

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

  async update(
    id: Types.ObjectId,
    userBody: Partial<IUserDocument>
  ): Promise<any> {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    if (userBody.email && (await User.isEmailTaken(userBody.email))) {
      throw new Error("Email is already taken");
    }

    Object.assign(userToUpdate, userBody);

    await userToUpdate.save();

    return userToUpdate;
  }

  async delete(id: Types.ObjectId): Promise<IUser> {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await userToDelete.remove();

    return userToDelete;
  }

  async get(id: Types.ObjectId): Promise<IUserDocument> {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getAll(): Promise<any> {
    const users = await User.find();

    return users;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
