import express, { Router } from "express";

import { ProviderController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";
import { auth } from "../../middlewares/auth";

const router = express.Router();

export class ProviderRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    // GET - POST /v1/users
    this.router
      .route("/")
      .get(auth(), catchAsync(ProviderController.getAllProviders))
      .post(auth('manageUsers'), catchAsync(ProviderController.addNewProvider));

    // GET - PUT - DELETE /v1/users/:id
    this.router
      .route("/:_id")
      .get(auth(), catchAsync(ProviderController.getProviderById))
      .put(auth(), catchAsync(ProviderController.updateProviderById))
      .delete(auth('manageUsers'), catchAsync(ProviderController.deleteProviderById));
  }
}
