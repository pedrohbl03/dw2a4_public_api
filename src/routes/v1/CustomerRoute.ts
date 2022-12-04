import express, { Router } from "express"

import { CustomerController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";
import { auth } from "../../middlewares/auth";

const router = express.Router();

export class CustomerRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    this.router
    .route('/')
    .get(auth(), catchAsync(CustomerController.getAllCustomers))
    .post(auth(), catchAsync(CustomerController.addNewCustomer))

    this.router
      .route(':id')
      .get(auth(), catchAsync(CustomerController.deleteCustomerById))
      .put(auth(), catchAsync(CustomerController.updateCustomerById))
      .delete(auth(), catchAsync(CustomerController.deleteCustomerById))
  }
}
