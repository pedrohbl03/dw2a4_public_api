import express, { Router } from "express"

import { CustomerController } from "../../controllers";
import { catchAsync } from "../../utils/CatchAsync";

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
    .get(catchAsync(CustomerController.getAllCustomers))
    .post(catchAsync(CustomerController.addNewCustomer))

    this.router
      .route(':id')
      .get(catchAsync(CustomerController.deleteCustomerById))
      .put(catchAsync(CustomerController.updateCustomerById))
      .delete(catchAsync(CustomerController.deleteCustomerById))
  }
}
