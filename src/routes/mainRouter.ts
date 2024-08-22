import express, { Request, Response, NextFunction } from "express";
import { body, header, validationResult } from "express-validator"
import { chainCheck } from "../middlewares/validationMiddleware";
import * as loginController from "../controllers/loginController"
import * as userController from "../controllers/userController"

export const mainRouter = express()

mainRouter.post("/login", 
  [
    header("Authorization").notEmpty(),
    chainCheck

  ],
  loginController.login
)

mainRouter.get("/usuario", 
  [

  ],
  userController.getUser
)

mainRouter.get("/usuario/:id", 
  [

  ],
  userController.getUser
)

mainRouter.post("/usuario", 
  [

  ],
  userController.postUser
)

mainRouter.put("/usuario", 
  [

  ],
  userController.putUser
)

mainRouter.delete("/usuario/:id", 
  [

  ],
  userController.delUser
)