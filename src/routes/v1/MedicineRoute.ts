import express, { Router } from "express";

import { MedicineController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";
import { auth } from "../../middlewares/auth";

const router = express.Router();

export class MedicineRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    // GET - POST /v1/users
    this.router
      .route("/")
      .get(auth(), catchAsync(MedicineController.getAllMedicines))
      .post(auth(), catchAsync(MedicineController.addNewMedicine));

    // GET - PUT - DELETE /v1/users/:id
    this.router
      .route("/:_id")
      .get(auth(), catchAsync(MedicineController.getMedicineById))
      .put(auth(), catchAsync(MedicineController.updateMedicineById))
      .delete(auth(), catchAsync(MedicineController.deleteMedicineById));
  }
}
