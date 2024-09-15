import { Request, Response } from "express"
import * as userModel from "../models/userModel"
import * as bcryptUtils from "../utils/bcryptUtils"
import * as jwtUtils from "../utils/jwtUtils"

export const decryptAuth = (authorization : string) =>  {
  const b64Str = authorization.split(" ")[1];
  const decryptResult = Buffer.from(b64Str, 'base64').toString('utf8');
  let [user, pass] = decryptResult.split(":");
  return {user, pass}
}

export const login = async (req : Request, res : Response) => {

  const basicAuth = req.headers.authorization as string;

  let { user , pass} = decryptAuth(basicAuth)

  console.log(`Ingreso usuario ${user}`);

  //const currentUser : User = jsonModel.selectUserById(parseInt(id));
  const [currentUser] : User[] = await userModel.getUsuariosByEmail(user);

  if (!currentUser) {
    return res.sendStatus(403)
  }

  const validPwd = await bcryptUtils.verifyPassword(pass, currentUser.usr_pwd)

  if (!validPwd) {
    return res.sendStatus(403)
  }

  const usr = {
    usr_id : currentUser.usr_id,
    usr_rut : currentUser.usr_rut,
    usr_neg_id : currentUser.usr_neg_id,
    usr_nombre : currentUser.usr_nombre,
    usr_per_id : currentUser.usr_per_id,
    usr_correo : currentUser.usr_correo,
    usr_desc : currentUser.usr_desc,
    token : jwtUtils.generateToken(currentUser.usr_id)
  }

  if (!currentUser.hasOwnProperty("usr_id")) {
    return res.sendStatus(403)
  } else {
    return res.send({status : true, msg : "usuario autenticado", data : usr})
  }

}