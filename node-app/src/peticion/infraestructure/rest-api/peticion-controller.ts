
import { Request, Response } from "express";
import { response } from "../../../shared/infrastructure/dependencies";
import { PeticionBussinesOne } from "../../aplication/usecases/peticion-bussines-one";

export class PeticionController {
    constructor(
        private peticionBussinesOne: PeticionBussinesOne
    ) {}

    async sendHttpRequestBussinesOneBodega(req: Request, res: Response) {
        try {
            req.body = {};
            response.success("Se obtuvo las bodegas de Bussiness One");
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneBodega();
            return res.status(200).json(response.success("Se obtuvo las bodegas de Bussiness One", dataResponse));
        } catch (error) {
           return response.handleError(res, error);
        }
    }

    async sendHttpRequestBussinesOneUbicacionesBodega(req: Request, res: Response) {
        try {
            const { bodega } = req.body;
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneUbicacionesBodega(bodega);
            return res.status(200).json(response.success("Se obtuvo las ubicaciones de la bodega", dataResponse, dataResponse.length));
        } catch (error) {
            return response.handleError(res, error);
        }
    }
}