import httpStatus from "http-status";
import { Types } from "mongoose";

import { IUserService, IUser, IUserDocument } from "../interfaces/User";
import User from "../models/UserModel";
import ApiError from "../utils/ApiError";

export class UserService implements IUserService {
  public async add(userBody: IUser): Promise<any> {
    const { name, email, password } = userBody;

    if (await User.isEmailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return newUser;
  }

  public async update(
    id: Types.ObjectId,
    userBody: Partial<IUserDocument>
  ): Promise<any> {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    if (userBody.email && (await User.isEmailTaken(userBody.email))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }

    Object.assign(userToUpdate, userBody);

    await userToUpdate.save();

    return userToUpdate;
  }

  public async delete(id: Types.ObjectId): Promise<IUser> {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    await userToDelete.remove();

    return userToDelete;
  }

  public async get(id: Types.ObjectId): Promise<IUserDocument> {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

  public async getAll(): Promise<any> {
    const users = await User.find();

    return users;
  }

  public async getUserByEmail(email: string): Promise<any> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }
}
