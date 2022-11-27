import express, { Router } from "express";

import { UserController } from "../../controllers";

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
      .get(UserController.getUsers)
      .post(UserController.addUser);

    // GET - PUT - DELETE /v1/users/:id
    this.router
      .route("/:_id")
      .get(UserController.getUser)
      .put(UserController.updateUser)
      .delete(UserController.deleteUser);
  }
}
