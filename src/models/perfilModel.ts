import { Pool } from "pg";
import { getPoolConn } from "../services/databaseService"

export const selectPerfil = async (id : number | null) : Promise<any[]>=> {
    
  let result : any = []

  const qry = 
  `--sql
  SELECT 
    * 
  FROM tupuestoprod_schema.perfil
  WHERE ($1::integer IS NULL OR per_id = $2::integer);
  `

  try {
    const conn : Pool = await getPoolConn();
    result = await conn.query(qry, [id, id])
  } catch (e : any) {
    console.log(e.message)
  }

  return result.rows ? result.rows : [];

}

export const InsertPerfil = async (dbInsertObj : any) : Promise<number> => {

  let result : any = 0

  const {
    desc,
    codigo
   } = dbInsertObj
    
    const qry = 
    `--sql
    INSERT INTO tupuestoprod_schema.perfil (
      per_desc,
      per_codigo
    ) VALUES (
      $1,
      $2
    );
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [desc, codigo])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}

export const updatePerfil = async (updateObj : any) => {

  let result : any = 0

  const {
    desc,
    codigo,
    id
  } = updateObj

    const qry = 
    `--sql
    UPDATE tupuestoprod_schema.perfil
    SET per_desc    = $1,
        per_codigo  = $2
    WHERE per_id = $3;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [desc, codigo, id])
    } catch (e : any) {
      console.log(e.message)
    }

    return result.rowCount ? result.rowCount : 0;

}

export const deletePerfil = async (id : number) => {

  let result : any = 0


    const qry = 
    `--sql
    DELETE FROM tupuestoprod_schema.perfil
    WHERE per_id = $1;
    `

    try {
      const conn : Pool = await getPoolConn();
      result = await conn.query(qry, [id])
    } catch (e : any) {
      console.log(e.message)
    }
  
    return result.rowCount ? result.rowCount : 0;

}