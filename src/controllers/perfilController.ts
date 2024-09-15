import { Request, Response } from "express";
import * as bcryptUtils from "../utils/bcryptUtils";
import * as perfilModel from "../models/perfilModel";

export const getPerfil = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? +(req.params["id"]) : null

    const result : any[] = await perfilModel.selectPerfil(id)

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registros/s", data : result })
    else return res.status(200).send({ status: true, message: "Registro/s encontrado/s", data : result })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const postPerfil = async (req: Request, res: Response) => {
  try {

    const {
      desc,
      codigo
    } = req.body;

    const result : any = await perfilModel.InsertPerfil({
      desc,
      codigo
    })

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

export const putPerfil = async (req: Request, res: Response) => {
  try {

    const {
      desc,
      codigo,
      id
    } = req.body;

    const result : any = await perfilModel.updatePerfil({
      desc,
      codigo,
      id
    })

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

export const delPerfil = async (req: Request, res: Response) => {
  try {

    const id = +(req.params["id"]);

    const result : any = await perfilModel.deletePerfil(id)

    if (result === 1) return res.status(200).send({ status: true, message: "Registro borrado" })
    else return res.status(200).send({ status: false, message: "Error al borrar registro" })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}