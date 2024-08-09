import { logger, pgClient } from "../../shared/infrastructure/dependencies";
import { PeticionBussinesOne } from "../aplication/usecases/peticion-bussines-one";

import { CuerpoService } from "../domain/services/cuerpoService";

import { PeticionController } from "./rest-api/peticion-controller";


const cuerpo = new CuerpoService(
    pgClient,
    logger
);
// const ambiente = new AmbienteService();
// const tipo = new TipoPeticionService();

//const createPeticion = new CreatePeticion(cuerpo, ambiente, tipo, logger);
const peticionBussinesOne = new PeticionBussinesOne(cuerpo, logger);


export const peticionController = new PeticionController( peticionBussinesOne);