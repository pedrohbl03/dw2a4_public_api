import express, { Router } from "express";

import { AuthController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";
import { auth } from "../../middlewares/auth";

const router = express.Router();

export class AuthRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    this.router.route("/login").post(catchAsync(AuthController.login));

    this.router.route("/register").post(auth(), catchAsync(AuthController.register));

    this.router.route("/logout").post(catchAsync(AuthController.logout));

    this.router
      .route("/forgot-password")
      .post(catchAsync(AuthController.forgotPassword));

    this.router
      .route("/refresh-tokens")
      .post(catchAsync(AuthController.refreshTokens));
  }
}
