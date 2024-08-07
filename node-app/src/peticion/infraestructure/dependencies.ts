import { logger, response } from "../../shared/infrastrucutre/dependencies";
import { CreatePeticion } from "../aplication/usecases/create-peticion";
import { PeticionBussinesOne } from "../aplication/usecases/peticion-bussines-one";
import { AmbienteService } from "../domain/services/ambienteService";
import { CuerpoService } from "../domain/services/cuerpoService";
import { TipoPeticionService } from "../domain/services/tipo-peticionService";
import { PeticionController } from "./rest-api/peticion-controller";


const cuerpo = new CuerpoService();
const ambiente = new AmbienteService();
const tipo = new TipoPeticionService();

const createPeticion = new CreatePeticion(cuerpo, ambiente, tipo, logger);
const peticionBussinesOne = new PeticionBussinesOne(cuerpo, logger);


export const peticionController = new PeticionController(createPeticion, peticionBussinesOne);