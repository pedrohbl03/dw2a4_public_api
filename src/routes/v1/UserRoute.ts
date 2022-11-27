import express, { Router } from "express";

import { UserController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";

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
      .get(catchAsync(UserController.getUsers))
      .post(catchAsync(UserController.addUser));

    // GET - PUT - DELETE /v1/users/:id
    this.router
      .route("/:_id")
      .get(catchAsync(UserController.getUser))
      .put(catchAsync(UserController.updateUser))
      .delete(catchAsync(UserController.deleteUser));
  }
}
