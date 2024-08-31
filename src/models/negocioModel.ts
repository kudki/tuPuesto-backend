import { Pool } from "pg";
import { getPoolConn } from "../services/databaseService"

export const selectNegocio = async (id : number | null) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    * 
  FROM tupuestoprod_schema.negocio
  WHERE ($1::integer IS NULL OR neg_id = $2::integer);
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [id, id])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const InsertNegocio = async (dbInsertObj : any) : Promise<number> => {

  let result : any = 0

  const {
    neg_rut,
    neg_nombre,
    neg_desc 
   } = dbInsertObj
    
    const qry = 
    `--sql
    INSERT INTO tupuestoprod_schema.cola (
      neg_rut,
      neg_nombre,
      neg_desc,  -- Cambié cola_restado a cola_estado para que coincida con la columna en el UPDATE
    ) VALUES (
      $1,
      $2,
      $3
    );
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [ neg_rut, neg_nombre, neg_desc ])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}

export const updateNegocio = async (updateObj : any) => {

  let result : any = 0

  const {
    neg_id,
    neg_rut,
    neg_nombre,
    neg_desc 
  } = updateObj

    const qry = 
    `--sql
    UPDATE tupuestoprod_schema.cola
    SET neg_rut = $1,
        neg_nombre = $2,
        neg_desc = $3,
    WHERE neg_id = $4;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [ neg_rut, neg_nombre, neg_desc, neg_id ])
    } catch (e : any) {
      console.log(e.message)
    }

    return result.rowCount ? result.rowCount : 0;

}

export const deleteNegocio = async (id : number) => {

  let result : any = 0


    const qry = 
    `--sql
    DELETE FROM tupuestoprod_schema.negocio
    WHERE neg_id = $1;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [id])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}