
import { Request, Response } from "express";
import { response } from "../../../shared/infrastrucutre/dependencies";
import { PeticionBussinesOne } from "../../aplication/usecases/peticion-bussines-one";

export class PeticionController {
    constructor(
        private peticionBussinesOne: PeticionBussinesOne
    ) {}
    


    async sendHttpRequestBussinesOneBodega(res: Response) {
        try {
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneBodega();
            return res.status(200).json(response.success("Se obtuvo las bodegas de Bussiness One", dataResponse));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json(response.failed(500, error.message));
            } else {
                return res.status(500).json(response.failed(500, "Error al obtener las bodegas de Bussiness One"));
            }
        }
    }

    async sendHttpRequestBussinesOneUbicacionesBodega(req: Request, res: Response) {
        try {
            const { bodega } = req.body;
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneUbicacionesBodega(bodega);
            return res.status(200).json(response.success("Se obtuvo las ubicaciones de la bodega", dataResponse, dataResponse.length));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json(response.failed(500, error.message));
            } else {
                return res.status(500).json(response.failed(500, "Error al obtener las ubicaciones de la bodega"));
            }
        }
    }
}