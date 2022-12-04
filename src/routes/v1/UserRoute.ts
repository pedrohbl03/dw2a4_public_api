import express, { Router } from "express";

import { UserController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";
import { auth } from "../../middlewares/auth";

const router = express.Router();

export class UserRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    // GET - POST /v1/users
    this.router
      .route("/")
      .get(auth('getUsers'), catchAsync(UserController.getUsers))
      .post(auth('manageUsers'),catchAsync(UserController.addUser));

    // GET - PUT - DELETE /v1/users/:id
    this.router
      .route("/:_id")
      .get(auth('getUsers'), catchAsync(UserController.getUser))
      .put(auth('manageUsers'), catchAsync(UserController.updateUser))
      .delete(auth('manageUsers'), catchAsync(UserController.deleteUser));
  }
}
