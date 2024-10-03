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

export const selectEnEspera = async () : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    ROW_NUMBER() OVER (ORDER BY cola_fecha ASC) AS cola_numero,
    cola_id,
    cola_neg_id,
    cola_usr_id,
    cola_correo,
    cola_estado,
    cola_fecha,
    cola_usr_nombre
  FROM 
    tupuestoprod_schema.cola
  WHERE 
    cola_estado = 'ESPERA'
  ORDER BY 
    cola_fecha ASC;
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry)
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
    usr_nombre,
    correo,
    fecha,
    estado 
   } = dbInsertObj
    
    const qry = 
    `--sql
    INSERT INTO tupuestoprod_schema.cola (
      cola_neg_id,
      cola_usr_id,
      cola_usr_nombre,
      cola_correo,
      cola_fecha,
      cola_estado
    ) 
    VALUES (
      $1,
      $2,
      $3,
      $4,
      NOW(),
      $5
    )
    RETURNING cola_id;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [neg_id, usr_id, usr_nombre, correo, estado])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rows.length > 0 && result.rows[0].cola_id ? result.rows[0].cola_id : 0;


}

export const updateCola = async (updateObj : any) => {

  let result : any = 0

  const {
    neg_id,
    usr_id,
    usr_nombre,
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
        cola_usr_nombre = $3,
        cola_correo = $4,
        cola_fecha  = $5,
        cola_estado = $6
    WHERE cola_id = $7;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [neg_id, usr_id, usr_nombre, correo, fecha, estado, id])
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