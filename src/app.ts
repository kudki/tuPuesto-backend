import express, { Express } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "node:path"
import { htmlTemplate } from "./public/htmlTemplate"

import * as config from "./config"
import { mainRouter } from "./routes/mainRouter"

const morgan = require("morgan")

const app = async () => {

  const app: Express = express();


  const corsOptions = {
    origin: 'https://frontdev.tupuesto.cl', // Cambia esto por el dominio correcto
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autorización
};

  /**
   * PAGINA ESTATICA
   */

  /**
   * INICIO DE DB
   */

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  //app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  //ROUTES
  app.get('/', (req, res) => res.send(htmlTemplate));
  app.use(mainRouter)

  app.listen(config.PORT, () => {
    
    console.table({
      appName : "plantilla",
      node_env : config.NODE_ENV,
      port : config.PORT
    })

    return void 0
  })

}

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rechazo no manejado:', reason);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido. Apagando...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Apagando...');
  process.exit(0);
});

app();