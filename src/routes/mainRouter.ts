import express, { Request, Response, NextFunction } from "express";
import { body, header, validationResult } from "express-validator"
import { chainCheck } from "../middlewares/validationMiddleware";
import * as loginController from "../controllers/loginController"

export const mainRouter = express()

mainRouter.post("/login", 
  [
    header("Authorization").notEmpty(),
    chainCheck

  ],
  loginController.login
)