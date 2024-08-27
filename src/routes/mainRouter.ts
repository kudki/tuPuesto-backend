import express, { Request, Response, NextFunction } from "express";
import { body, header, validationResult } from "express-validator"
import { chainCheck } from "../middlewares/validationMiddleware";
import * as loginController from "../controllers/loginController"
import * as userController from "../controllers/userController"
import * as colaController from "../controllers/colaController"

export const mainRouter = express()

mainRouter.post("/login", 
  [
    header("Authorization").notEmpty(),
    chainCheck

  ],
  loginController.login
)

//USUARIO

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

//COLA
mainRouter.get("/cola", 
  [

  ],
  colaController.getCola
)

mainRouter.get("/cola/:id", 
  [

  ],
  colaController.getCola
)

mainRouter.post("/cola", 
  [

  ],
  colaController.postCola
)

mainRouter.put("/cola", 
  [

  ],
  colaController.putCola
)

mainRouter.delete("/cola/:id", 
  [

  ],
  colaController.delCola
)