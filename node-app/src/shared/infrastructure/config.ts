import dotenv from "dotenv";
const nodeEnv = String(process.env.NODE_ENV).trim();

const envFile = nodeEnv === "dev" ? ".env.dev" : ".env";
dotenv.config({ path: `./${envFile}` });
// #Variables de entorno para el middleware
// MW_URL=https://integrador.eurofish.com.ec:8490/v1/api/message/generic
// MW_SOURCE=e33634e1-4bbc-4b0c-aed9-d4d70431c88b
// MW_DESTINATION=9a5f6001-4b83-42e0-b78e-6bd4f127dff3
// MW_OPERATION=R
// MW_VERB=POST
// MW_PATH=/2c99d65c-8ef9-4aa2-814c-352a0c23b201

export const config = {
  server: {
    port: Number(process.env.PORT) || 3000,
    url: process.env.URL || "0.0.0.0",
  },
  database: {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE,
  },
  logs: {
    host: process.env.LOGS_HOST || "0.0.0.0",
    port: Number(process.env.LOGS_PORT) || 12201,
  },
  middleware: {
    url:
      process.env.MW_URL ||
      "https://integrador.eurofish.com.ec:8490/v1/api/message/generic",
    source: process.env.MW_SOURCE || "e33634e1-4bbc-4b0c-aed9-d4d70431c88b",
    destination:
      process.env.MW_DESTINATION || "9a5f6001-4b83-42e0-b78e-6bd4f127dff3",
    operation: process.env.MW_OPERATION || "R",
    verb: process.env.MW_VERB || "POST",
    path: process.env.MW_PATH || "/2c99d65c-8ef9-4aa2-814c-352a0c23b201",
  },
};
