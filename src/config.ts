import * as dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV || 'development'

if (NODE_ENV === 'development') {
  dotenv.config();
}

// DB
export const DB_HOST = `${process.env.DB_HOST}`
export const DB = `${process.env.DB}`
export const DB_USR = `${process.env.DB_USR}`
export const DB_PWD = `${process.env.DB_PWD}`
export const DB_PORT = +(process.env.DB_PORT || 0)
export const SECRET_KEY = `${process.env.SECRET_KEY}`

// API
export const PORT = process.env.PORT || 4001
