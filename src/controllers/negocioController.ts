import { Request, Response } from "express";
import * as bcryptUtils from "../utils/bcryptUtils";
import * as negocioModel from "../models/negocioModel"

export const getNegocio = async (req: Request, res: Response) => {
  try {

    let id = req.params["id"] ? +(req.params["id"]) : null

    const result : any[] = await negocioModel.selectNegocio(id)

    if (result.length === 0) return res.status(200).send({ status: true, message: "Sin registro/s", data : result })
    else return res.status(200).send({ status: true, message: "Registro/s encontrado/s", data : result })

  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: false,
      message: "Error Interno"
    })
  }
}

export const postNegocio = async (req: Request, res: Response) => {
  try {

    const {rut, nombre, desc} = req.body;

    const result : any = await negocioModel.InsertNegocio({
      rut,
      nombre,
      desc
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

export const putNegocio = async (req: Request, res: Response) => {
  try {

    const {
      id,
      rut,
      nombre,
      desc 
    } = req.body;

    const result : any = await negocioModel.updateNegocio({
      id,
      rut,
      nombre,
      desc
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

export const delNegocio = async (req: Request, res: Response) => {
  try {

    const id = +(req.params["id"]);

    const result : any = await negocioModel.deleteNegocio(id)

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