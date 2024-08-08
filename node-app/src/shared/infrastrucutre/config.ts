import dotenv from "dotenv";
const nodeEnv = String(process.env.NODE_ENV).trim();

const envFile = nodeEnv === 'dev' ? '.env.dev' : '.env';
dotenv.config({ path: `./${envFile}` });

export const config = {
    server: {
        port: Number(process.env.PORT) || 3000,
        url: process.env.URL  || '0.0.0.0',
    },
    database: {
        host: process.env.HOST,
        port: process.env.PORT_DB,
        user: process.env.USER,
        password: process.env.PASSWORD_BD,
        database: process.env.DATABASE,
    },
    logs: {
        host: process.env.LOGS_HOST  || '0.0.0.0',
        port: Number(process.env.LOGS_PORT) || 12201,
    },
    middleware: {
        url: process.env.URL_MIDDLEWARE,
        source: process.env.SOURCE,
        destination: process.env.DESTINATION,
        operation: process.env.OPERATION,
        verb: process.env.VERB,
    },
};