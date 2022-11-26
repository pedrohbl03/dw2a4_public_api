import { ObjectId } from "mongoose";

import { IUserService } from "../interfaces/IUserService";
import User, { IUserDocument } from "../models/User";

export class UserService implements IUserService {
  async add(userBody: IUserDocument): Promise<any> {
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

  async update(id: ObjectId, userBody: any): Promise<any> {
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

  async delete(id: ObjectId): Promise<any> {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await userToDelete.remove();

    return userToDelete;
  }

  async get(id: ObjectId): Promise<any> {
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
}
