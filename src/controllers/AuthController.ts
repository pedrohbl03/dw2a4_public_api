import { Request, Response } from "express";

import { AuthService, TokenService } from "../services";

const _authService = new AuthService();
const _tokenService = new TokenService();

export class AuthController {
  public static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await _authService.login(email, password);
    const tokens = await _tokenService.generateAuthTokens(user);

    return res.status(200).json({ user, tokens });
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const newUser = await _authService.register(name, email, password);

    return res.status(200).json(newUser);
  }

  public static async logout(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;
    const result = await _authService.logout(refreshToken);

    return res.status(200).json(result);
  }

  public static async forgotPassword(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { email } = req.body;
    const result = await _authService.forgotPassword(email);

    return res.status(200).json(result);
  }

  public static async refreshTokens(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { refreshToken } = req.body;
    const result = await _authService.refreshTokens(refreshToken);

    return res.status(200).json(result);
  }
}
