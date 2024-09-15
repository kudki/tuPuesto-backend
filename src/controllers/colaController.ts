import { Request, Response } from "express";
import * as bcryptUtils from "../utils/bcryptUtils";
import * as colaModel from "../models/colaModel";

export const getCola = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? +(req.params["id"]) : null

    const result : any[] = await colaModel.selectCola(id)

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

export const postCola = async (req: Request, res: Response) => {
  try {

    const {
      neg_id,
      usr_id,
      correo,
      fecha,
      estado 
    } = req.body;

    const result : any = await colaModel.InsertCola({
      neg_id,
      usr_id,
      correo,
      fecha,
      estado 
    })

    if (result === 1) return res.status(200).send({ status: true, message: "Registro creado" })
    else return res.status(200).send({ status: false, message: "Error al crear registro" })


  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const putCola = async (req: Request, res: Response) => {
  try {

    const {
      neg_id,
      usr_id,
      correo,
      fecha,
      estado,
      id
    } = req.body;

    const result : any = await colaModel.updateCola({
      neg_id,
      usr_id,
      correo,
      fecha,
      estado,
      id
    })

    if (result === 1) return res.status(200).send({ status: true, message: "Registro actualizado" })
    else return res.status(200).send({ status: false, message: "Error al actualizar registro" })


  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const delCola = async (req: Request, res: Response) => {
  try {

    const id = +(req.params["id"]);

    const result : any = await colaModel.deleteCola(id)

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