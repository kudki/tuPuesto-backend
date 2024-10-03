import { Request, Response } from "express";
import * as userModel from "../models/userModel"
import * as bcryptUtils from "../utils/bcryptUtils"

export const getUser = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? +(req.params["id"]) : null

    const result = await userModel.getUsuarios(id)

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registros de usuario/s", data : result })
    else return res.status(200).send({ status: true, message: "Usuario/s encontrado/s", data : result })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const getUserPuesto = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? req.params["id"] : null

    const result = await userModel.getUsuarioPuesto(id)

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registros de usuario/s", data : result })
    else return res.status(200).send({ status: true, message: "Usuario/s encontrado/s", data : result })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const postUser = async (req: Request, res: Response) => {
  try {

    const body = req.body;

    body.pwd = await bcryptUtils.hashPassword(body.pwd, 10)

    const result = await userModel.InsertUsuario(body)

    if (result === 1) return res.status(200).send({ status: true, message: "Usuario creado" })
    else return res.status(200).send({ status: false, message: "Error al crear usuario" })


  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const putUser = async (req: Request, res: Response) => {
  try {

    const body = req.body;

    body.pwd = await bcryptUtils.hashPassword(body.pwd, 10);

    const result = await userModel.updateUsuario(body)

    if (result === 1) return res.status(200).send({ status: true, message: "Usuario actualizado" })
    else return res.status(200).send({ status: false, message: "Error al actualizar usuario" })


  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const delUser = async (req: Request, res: Response) => {
  try {

    const id = +(req.params["id"]);

    const result = await userModel.deleteUsuario(id)

    if (result === 1) return res.status(200).send({ status: true, message: "Usuario borrado" })
    else return res.status(200).send({ status: false, message: "Error al borrar usuario" })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}