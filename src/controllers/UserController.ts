import { Request, Response } from "express";

import { IUser, IUserDocument } from "../interfaces";
import { UserService } from "../services";

const _userService = new UserService();

export class UserController {
  public static async addUser(
    req: Request<null, IUser>,
    res: Response
  ): Promise<Response> {
    const user = req.body;
    const result = await _userService.add(user);

    return res.status(201).json(result);
  }

  public static async getUsers(req: Request, res: Response): Promise<Response> {
    const result = await _userService.getAll();

    return res.status(200).json(result);
  }

  public static async getUser(
    req: Request<IUserDocument>,
    res: Response
  ): Promise<Response> {
    const { _id } = req.params;
    const result = await _userService.get(_id);

    return res.status(200).json(result);
  }

  public static async updateUser(
    req: Request<IUserDocument>,
    res: Response
  ): Promise<Response> {
    const { _id } = req.params;
    const user = req.body;
    const result = await _userService.update(_id, user);

    return res.status(200).json(result);
  }

  public static async deleteUser(
    req: Request<IUserDocument>,
    res: Response
  ): Promise<Response> {
    const { _id } = req.params;
    const result = await _userService.delete(_id);

    return res.status(200).json(result);
  }
}
