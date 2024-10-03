import express, { Request, Response, NextFunction } from "express";
import { body, header, validationResult } from "express-validator"
import { chainCheck } from "../middlewares/validationMiddleware";
import * as loginController from "../controllers/loginController";
import * as userController from "../controllers/userController";
import * as colaController from "../controllers/colaController";
import * as perfilController from "../controllers/perfilController";
import * as negocioController from "../controllers/negocioController";

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

mainRouter.get("/usuario/puesto/:id", 
  [

  ],
  userController.getUserPuesto
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

mainRouter.get("/cola/estado/espera", 
  [

  ],
  colaController.getEnEspera
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

//NEGOCIO
mainRouter.get("/negocio", 
  [

  ],
  negocioController.getNegocio
)

mainRouter.get("/negocio/:id", 
  [

  ],
  negocioController.getNegocio
)

mainRouter.post("/negocio", 
  [

  ],
  negocioController.postNegocio
)

mainRouter.put("/negocio", 
  [

  ],
  negocioController.putNegocio
)

mainRouter.delete("/negocio/:id", 
  [

  ],
  negocioController.delNegocio
)

//PERFIL
mainRouter.get("/perfil", 
  [

  ],
  perfilController.getPerfil
)

mainRouter.get("/perfil/:id", 
  [

  ],
  perfilController.getPerfil
)

mainRouter.post("/perfil", 
  [

  ],
  perfilController.postPerfil
)

mainRouter.put("/perfil", 
  [

  ],
  perfilController.putPerfil
)

mainRouter.delete("/perfil/:id", 
  [

  ],
  perfilController.delPerfil
)