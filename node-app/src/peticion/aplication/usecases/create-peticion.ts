// import { AmbienteService } from "../../domain/services/ambienteService";

// import { IPeticionDTO } from "../interfaces/cuerpo-interface";
// import { CuerpoService } from '../../domain/services/cuerpoService';
// import { TipoPeticionService } from "../../domain/services/tipo-peticionService";
// import { Logger } from "../../../shared/domain/logger";


// export class CreatePeticion {
//   constructor(
//     private readonly cuerpo: CuerpoService,
//     private readonly ambiente: AmbienteService,
//     private readonly tipo: TipoPeticionService,
//     private readonly logger: Logger
//   ) {}
//   async create(peticion: IPeticionDTO) {
//     this.logger.info(`Creating peticion al ambiente ${peticion.ambiente} con la url ${peticion.url} y el path ${peticion.path}`);
//     const ambiente = await this.ambiente.findOrCreate(peticion.ambiente);

//     if (!ambiente) {
//         const error = new Error(`Ambiente ${peticion.ambiente} not found`);
//         this.logger.error(error.message);
//         throw error;
//     }
  
//     const tipo = await this.tipo.findOrCreate(peticion.tipo, peticion.url);
//     if (!tipo) {
//         const error = new Error(`Tipo ${peticion.tipo} not found`);
//         this.logger.error(error.message);
//         throw error
//     }
//       await this.cuerpo.post(peticion, ambiente, tipo);

//     this.logger.info(`Peticion creada con exito`);
//   }
  
// }


