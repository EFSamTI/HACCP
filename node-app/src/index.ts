
import app from './app';

import dotenv from "dotenv";
import { AppDataSource } from './shared/infrastrucutre/database/connection';
import { config } from './shared/infrastrucutre/config';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada");
        const {url, port} = config.server;
        app.listen(port, url, () => {
            console.log(`Server activo en el puerto ${port} y en la dirección ${url}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

main();