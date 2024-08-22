import { Request, Response, NextFunction } from "express"
import { ErrorFormatter, FieldValidationError, Result, ValidationError, validationResult } from "express-validator";

export const chainCheck = (req : Request, res : Response, next : NextFunction) => {

  const errors = validationResult( req )
    .formatWith((error : any) => error)

  let errorArr : FieldValidationError[] = errors.array()

  let errorMsg = "";

  errorArr.forEach( (error : FieldValidationError) => {
    errorMsg = `${error.msg} in ${error.path}`
  } )

  if(Array.isArray(errorArr) && errorArr.length > 0) {
    return res.status(200).send({
      status : false,
      msg : errorMsg
    })
  } else {
    next();
  }

}

export const validationErrorFormater = () => {

}