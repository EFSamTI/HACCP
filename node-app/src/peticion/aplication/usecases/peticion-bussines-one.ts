import { Logger } from "../../../shared/domain/logger";
import { CuerpoService } from "../../domain/services/cuerpoService";
import { sendHttpRequest } from "../../infraestructure/rest-api/sendHttpRequest";



export class PeticionBussinesOne {
  constructor(
    private readonly cuerpoService: CuerpoService,
    private readonly logger: Logger
  ) {}
  async sendHttpRequestBussinesOneBodega() {
    this.logger.info(`Creating peticion al ambiente bodega`);
    const cuerpo = await this.cuerpoService.getBodega();
    if (!cuerpo){
      const error = new Error(`Datos de petición not found`);
      this.logger.error(error.message);
      throw error;
    };
    const response = await sendHttpRequest(cuerpo);
    this.logger.info(`Peticion realizada con exito`);
    return response;

  }
  async sendHttpRequestBussinesOneUbicacionesBodega(bodega: string) {
    if (!bodega){
      const error = new Error(`Bodega not found`);
      this.logger.error(error.message);
      throw error;
    }
    this.logger.info(`Creating peticion al ambiente bodega`);
    const cuerpo = await this.cuerpoService.getUbicacionesBodega();
    if (!cuerpo){
      const error = new Error(`Datos de petición not found`);
      this.logger.error(error.message);
      throw error;
    };


    // {
    //   "body": {
    //     "tipo": "BUSSINES-ONE-UBICACIONES",
    //     "url": "https://integrador.eurofish.com.ec:8490/v1/api/message/business-one",
    //     "source": "1",
    //     "destination": "578c19ea-5930-417d-8fcc-661536f0775c",
    //     "operation": "R",
    //     "verb": "GET",
    //     "path": "/BinLocations?$select=AbsEntry,BinCode",
    //     "ambiente": "production"
    //   }

    //path: `/BinLocations?$filter=Warehouse eq '${bodega}'&$select=AbsEntry,BinCode`,

    const pathBodegga = cuerpo.path;
    const newPath = `${pathBodegga}?$filter=Warehouse eq '${bodega}'&$select=AbsEntry,BinCode`;
    cuerpo.path = newPath;

    const response = await sendHttpRequest(cuerpo);
    this.logger.info(`Peticion realizada con exito`);
    return response;
  }
}
