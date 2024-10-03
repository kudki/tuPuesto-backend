import { Request, Response } from "express";
import * as bcryptUtils from "../utils/bcryptUtils";
import * as colaModel from "../models/colaModel";
import * as usrModel from "../models/userModel"

export const getCola = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? +(req.params["id"]) : null

    const result: any[] = await colaModel.selectCola(id)

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registros/s", data: result })
    else return res.status(200).send({ status: true, message: "Registro/s encontrado/s", data: result })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const getEnEspera = async (req: Request, res: Response) => {
  try {


    const result: any[] = await colaModel.selectEnEspera()

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registros/s", data: result })
    else return res.status(200).send({ status: true, message: "Registro/s encontrado/s", data: result })

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
      usr_nombre,
      correo,
      fecha,
      estado
    } = req.body;

    //Buscar si ya existe un usuario registrado y devolverlo
    const puestoAnterior = await usrModel.getUsuarioPuesto(usr_id)

    if (puestoAnterior.length > 0) return res.status(200).send({ status: true, message: "Registro ya existe", data: puestoAnterior })

    const newId: any = await colaModel.InsertCola({
      neg_id,
      usr_id,
      usr_nombre,
      correo,
      fecha,
      estado
    })

    const puestoNuevo = await usrModel.getUsuarioPuesto(usr_id)

    if (newId === 0) return res.status(200).send({ status: false, message: "Error al crear registro" });

    return res.status(200).send({ status: true, message: "Registro creado", data: puestoNuevo })


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

    const result: any = await colaModel.updateCola({
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

    const result: any = await colaModel.deleteCola(id)

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