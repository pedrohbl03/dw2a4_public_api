import { Request, Response } from "express";

import { AuthService, TokenService } from "../services";

const _authService = new AuthService();
const _tokenService = new TokenService();

export class AuthController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await _authService.login(email, password);

    res.status(200).json(result);
  }

  public static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const result = await _authService.register(name, email, password);

    res.status(200).json(result);
  }

  public static async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const result = await _authService.logout(refreshToken);

    res.status(200).json(result);
  }

  public static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const result = await _authService.forgotPassword(email);

    res.status(200).json(result);
  }

  public static async refreshTokens(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const result = await _authService.refreshTokens(refreshToken);

    res.status(200).json(result);
  }

}
