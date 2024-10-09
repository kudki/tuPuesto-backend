
import { Client } from "pg";
import { DB, DB_HOST, DB_PORT, DB_PWD, DB_USR } from "../config";

export const dbTest = async () => {
  let result: any = [];

  const qry = 
  `SELECT 
    NOW() AS current_time;`; // Corregido: la consulta SQL ahora es válida

  const client = new Client({
    host: "186.103.200.27",
    port : 8889,
    database: "bdtupuestoprod",
    user: "tupuestoprod",
    password: "9w5A4U9w33zG",
  }); // Crea una nueva instancia de Client

  try {
    await client.connect(); // Conectar a la base de datos
    result = await client.query(qry); // Ejecutar la consulta
  } catch (e: any) {
    console.log(e.message); // Manejo de errores
  } finally {
    await client.end(); // Cerrar la conexión
  }

  return result.rows ? result.rows : []; // Retornar los resultados
}
