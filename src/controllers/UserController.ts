import { Request, Response } from "express";

import { User } from "../models";
import { UserService } from "../services";

const _userService = new UserService();

export class UserController {
  public static async addUser(req: Request, res: Response): Promise<Response> {
    const user = new User(req.body);
    const result = await _userService.add(user);

    return res.status(201).json(result);
  }

  public static async getUsers(req: Request, res: Response): Promise<Response> {
    const result = await _userService.getAll();

    return res.status(200).json(result);
  }

  public static async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await _userService.get(id);

    return res.status(200).json(result);
  }

  public static async updateUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const user = new User(req.body);
    const result = await _userService.update(id, user);

    return res.status(200).json(result);
  }

  public static async deleteUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const result = await _userService.delete(id);

    return res.status(200).json(result);
  }
}
