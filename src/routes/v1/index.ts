import express from "express";

import { AuthRoute } from "./AuthRoute";
import { UserRoute } from "./UserRoute";
import { CustomerRoute } from "./CustomerRoute"

const router = express.Router();

const _authRoute = new AuthRoute();
const _userRoute = new UserRoute();
const _customersRoute = new CustomerRoute();

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
