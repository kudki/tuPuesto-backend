import { Query, Pool } from "pg";
import { getPoolConn } from "../services/databaseService"

export const getUsuarios = async (id : number | null) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    * 
  FROM tupuestoprod_schema.usuarios
  WHERE ($1::integer IS NULL OR usr_id = $2::integer)
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [id, id])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const getUsuarioPuesto = async (id : string | null) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  WITH cola_espera AS (
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
  )
  SELECT *
  FROM cola_espera
  WHERE cola_usr_id = $1;
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [id])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const getUsuariosByEmail = async (email : string) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    * 
  FROM tupuestoprod_schema.usuarios
  WHERE usr_correo = $1::varchar
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [email])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const InsertUsuario = async (dbInsertObj : any) : Promise<number> => {

  let result : any = 0

  const {
    rut,
    neg_id,
    nombre,
    per_id,
    correo,
    desc,
    pwd,
   } = dbInsertObj
    
    const qry = 
    `--sql
    INSERT INTO tupuestoprod_schema.usuarios (
      usr_rut,
      usr_neg_id,
      usr_nombre,
      usr_per_id,
      usr_correo,
      usr_desc,
      usr_pwd
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [rut, neg_id, nombre, per_id, correo, desc, pwd,])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}

export const updateUsuario = async (updateObj : any) => {

  let result : any = 0

  const {
    rut,
    neg_id,
    nombre,
    per_id,
    correo,
    desc,
    pwd,
    id
  } = updateObj

    const qry = 
    `--sql
    UPDATE tupuestoprod_schema.usuarios
    SET usr_rut    = $1,
        usr_neg_id = $2,
        usr_nombre = $3,
        usr_per_id = $4,
        usr_correo = $5,
        usr_desc   = $6,
        usr_pwd    = $7
    WHERE usr_id = $8;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [    rut, neg_id, nombre, per_id, correo, desc, pwd, id])
    } catch (e : any) {
      console.log(e.message)
    }

    return result.rowCount ? result.rowCount : 0;

}

export const deleteUsuario = async (id : number) => {

  let result : any = 0


    const qry = 
    `--sql
    DELETE FROM tupuestoprod_schema.usuarios
    WHERE usr_id = $1;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [id])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}



