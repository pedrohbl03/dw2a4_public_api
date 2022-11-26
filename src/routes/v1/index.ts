const express = require("express");

const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/users",
    route: UserRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
