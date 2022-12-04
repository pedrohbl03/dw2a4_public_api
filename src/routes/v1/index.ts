import express from "express";

import { AuthRoute } from "./AuthRoute";
import { UserRoute } from "./UserRoute";
import { CustomerRoute } from "./CustomerRoute"
import { MedicineRoute } from "./MedicineRoute"
import { ProviderRoute } from "./ProviderRoute"

const router = express.Router();

const _authRoute = new AuthRoute();
const _userRoute = new UserRoute();
const _customersRoute = new CustomerRoute();
const _medicineRoute = new MedicineRoute();
const _providerRoute = new ProviderRoute();

const _defaultRoutes = [
  {
    path: "/auth",
    route: _authRoute.router,
  },
  {
    path: "/users",
    route: _userRoute.router,
  },
  {
    path: "/customers",
    route: _customersRoute.router,
  },
  {
    path: "/medicines",
    route: _medicineRoute.router,
  },
  {
    path: "/providers",
    route: _providerRoute.router,
  },
];
class V1Route {
  router: express.Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init(): void {
    _defaultRoutes.forEach((route) => {
      this.router.use(route.path, route.route);
    });
  }
}

export default new V1Route().router;
