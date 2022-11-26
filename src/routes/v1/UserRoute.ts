import { Router, Request, Response } from "express";

const express = require("express");

const router = express.Router();

class UserRoute {
  router: Router;

  constructor() {
    this.router = router;
    this.init();
  }

  init() {
    // GET /v1/users
    this.router.get("/", (req: Request, res: Response) => {
      res.send("All users");
    });

    // GET /v1/users/:id
    this.router.get("/:id", (req: Request, res: Response) => {
      res.send("User by id");
    });

    // POST /v1/users
    this.router.post("/", (req: Request, res: Response) => {
      res.send("Create user");
    });

    // PUT /v1/users/:id
    this.router.put("/:id", (req: Request, res: Response) => {
      res.send("Update user");
    });

    // DELETE /v1/users/:id
    this.router.delete("/:id", (req: Request, res: Response) => {
      res.send("Delete user");
    });
  }
}

module.exports = new UserRoute().router;