import { Pool } from "pg";
import { getPoolConn } from "../services/databaseService"

export const selectCola = async (id : number | null) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    * 
  FROM tupuestoprod_schema.cola
  WHERE ($1::integer IS NULL OR cola_id = $2::integer);
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [id, id])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const InsertCola = async (dbInsertObj : any) : Promise<number> => {

  let result : any = 0

  const {
    neg_id,
    usr_id,
    correo,
    fecha,
    estado 
   } = dbInsertObj
    
    const qry = 
    `--sql
    INSERT INTO tupuestoprod_schema.cola (
      cola_neg_id,
      cola_usr_id,
      cola_correo,
      cola_fecha,
      cola_estado  -- Cambié cola_restado a cola_estado para que coincida con la columna en el UPDATE
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    );
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [neg_id, usr_id, correo, fecha, estado])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}

export const updateCola = async (updateObj : any) => {

  let result : any = 0

  const {
    neg_id,
    usr_id,
    correo,
    fecha,
    estado,
    id
  } = updateObj

    const qry = 
    `--sql
    UPDATE tupuestoprod_schema.cola
    SET cola_neg_id = $1,
        cola_usr_id = $2,
        cola_correo = $3,
        cola_fecha  = $4,
        cola_estado = $5
    WHERE cola_id = $6;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [neg_id, usr_id, correo, fecha, estado, id])
    } catch (e : any) {
      console.log(e.message)
    }

    return result.rowCount ? result.rowCount : 0;

}

export const deleteCola = async (id : number) => {

  let result : any = 0


    const qry = 
    `--sql
    DELETE FROM tupuestoprod_schema.cola
    WHERE cola_id = $1;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [id])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}