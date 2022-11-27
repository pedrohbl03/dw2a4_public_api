import { Request, Response } from "express";

import {
  AuthService,
  EmailService,
  TokenService,
  UserService,
} from "../services";

const _userService = new UserService();
const _tokenService = new TokenService();
const _emailService = new EmailService();
const _authService = new AuthService(_userService, _tokenService);

export class AuthController {
  public static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await _authService.loginWithEmailAndPassword(email, password);
    const authTokens = await _tokenService.generateAuthTokens(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ user, authTokens });
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const newUser = await _userService.add({ name, email, password });

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
    const resetPasswordToken = await _tokenService.generateResetPasswordToken(
      email
    );
    await _emailService.sendResetPasswordEmail(email, resetPasswordToken);

    return res.status(200).json({ message: "Reset password e-mail send." });
  }

  public static async refreshTokens(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { refreshToken } = req.body;
    const result = await _authService.refreshAuth(refreshToken);

    return res.status(200).json(result);
  }

  public static async helloWorld(
    req: Request,
    res: Response
  ): Promise<Response> {
    return res.status(200).json({ message: "Hello World" });
  }
}
