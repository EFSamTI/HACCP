import dotenv from "dotenv";
const nodeEnv = String(process.env.NODE_ENV).trim();

const envFile = nodeEnv === 'dev' ? '.env.dev' : '.env';
dotenv.config({ path: `./${envFile}` });

export const config = {
    server: {
        port: Number(process.env.PORT) || 3000,
        url: process.env.URL || 'localhost',
    },
    database: {
        host: process.env.HOST,
        port: process.env.PORT_DB,
        user: process.env.USER,
        password: process.env.PASSWORD_BD,
        database: process.env.DATABASE,
    },
    logs: {
        host: process.env.LOGS_HOST || 'localhost',
        port: Number(process.env.LOGS_PORT) || 12201,
    },

};