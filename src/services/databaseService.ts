import { Pool, PoolConfig } from "pg"
import { DB_HOST, DB_PWD, DB_PORT, DB_USR, DB} from "../config"

let pool : Pool;

export const getPoolConn = async () => {
  if (pool === undefined){
    const poolConf : PoolConfig = {
      host: DB_HOST,
      port : DB_PORT,
      database: DB,
      user: DB_USR,
      password: DB_PWD,
    }
    console.log(poolConf)
    pool = new Pool(poolConf)
  }
  return pool
}