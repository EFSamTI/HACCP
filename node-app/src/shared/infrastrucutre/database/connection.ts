import { DataSource } from "typeorm";
import { config } from "../config";
import { CuerpoPeticion } from "../../../peticion/domain/entities/cuerpo";
import { TipoPeticion } from "../../../peticion/domain/entities/tipo-peticion";
import { AmbientePeticion } from "../../../peticion/domain/entities/ambiente";


const { host, port, user, password, database } = config.database;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: host,
    port: Number(port),
    username: user,
    password: password,
    database: database,
    logging: true,
    entities: [CuerpoPeticion, TipoPeticion, AmbientePeticion],
    synchronize: true
});