import { Request, Response, Router } from "express";
import express = require("express");

const router = express.Router();

class AuthRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init() {
    // POST /v1/auth/login
    this.router.post("/login", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    // POST /v1/auth/register
    this.router.post("/register", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    // POST /v1/auth/refresh-tokens
    this.router.post("/refresh-tokens", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    // POST /v1/auth/logout
    this.router.post("/logout", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    // POST /v1/auth/forgot-password
    this.router.post("/forgot-password", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new AuthRoute().router;
