import { Logger } from "../../../shared/domain/logger";
import { HttpRequest } from "../../../vessels/aplication/interfaces/http-request";
import { CuerpoService } from "../../domain/services/cuerpoService";
import { sendHttpRequest } from "../../infraestructure/rest-api/sendHttpRequest";
import { ResponseSearchRequestByType } from "../interfaces/response-search-request";

export class PeticionBussinesOne {
  constructor(
    private readonly cuerpoService: CuerpoService,
    private readonly logger: Logger
  ) {}
  private buildBodyRequest(cuerpo: ResponseSearchRequestByType): HttpRequest {
    return {
      url: cuerpo.search_request_by_type.url,
      source: cuerpo.search_request_by_type.source,
      destination: cuerpo.search_request_by_type.destination,
      operation: cuerpo.search_request_by_type.operation,
      verb: cuerpo.search_request_by_type.verb,
      path: cuerpo.search_request_by_type.path,
      body: null,
    };
  }
  async sendHttpRequestBussinesOneBodega() {
    this.logger.info(`Creating peticion al ambiente bodega`);
    const cuerpo: ResponseSearchRequestByType =
      await this.cuerpoService.searchRequestByType("BUSSINES-ONE-BODEGA");
    if (!cuerpo.search_request_by_type) {
      const error = new Error(`Datos de petición not found`);
      this.logger.error(error.message);
      throw error;
    }
    const bodyRequest = this.buildBodyRequest(cuerpo);
    const response = await sendHttpRequest(bodyRequest);
    this.logger.info(`Peticion realizada con exito`);
    return response;
  }

  async sendHttpRequestBussinesOneUbicacionesBodega(bodega: string) {
    if (!bodega) {
      const error = new Error(`Bodega not found`);
      this.logger.error(error.message);
      throw error;
    }
    this.logger.info(`Creating peticion al ambiente bodega`);
    const cuerpo: ResponseSearchRequestByType =
      await this.cuerpoService.searchRequestByType("BUSSINES-ONE-UBICACIONES");
    if (!cuerpo) {
      const error = new Error(`Datos de petición not found`);
      this.logger.error(error.message);
      throw error;
    }
    const pathBodegga = cuerpo.search_request_by_type.path;
    const newPath = `${pathBodegga}?$filter=Warehouse eq '${bodega}'&$select=AbsEntry,BinCode`;
    cuerpo.search_request_by_type.path = newPath;
    const bodyRequest = this.buildBodyRequest(cuerpo);
    const response = await sendHttpRequest(bodyRequest);
    this.logger.info(`Peticion realizada con exito`);
    return response;
  }
}
