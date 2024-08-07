
import { Request, Response } from "express";
import { CreatePeticion } from "../../aplication/usecases/create-peticion";
import { response } from "../../../shared/infrastrucutre/dependencies";
import { PeticionBussinesOne } from "../../aplication/usecases/peticion-bussines-one";

export class PeticionController {
    constructor(
        private createpeticion: CreatePeticion,
        private peticionBussinesOne: PeticionBussinesOne
    ) {}
    
    async createPeticion(req: Request, res: Response) {
        try {
        const { body } = req.body;
        await this.createpeticion.create(body);
        return res.status(201).json(response.success(201, "Petición creada"));
        } catch (error) {
            if (error instanceof Error ) {
                return res.status(500).json(response.failed(500, error.message, new Date().toISOString()));
            }
        }
    }

    async sendHttpRequestBussinesOneBodega(req: Request, res: Response) {
        try {
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneBodega();
            return res.status(200).json(response.success(200, "Se obtuvo las bodegas de Bussiness One", dataResponse));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json(response.failed(500, error.message, new Date().toISOString()));
            }
        }
    }

    async sendHttpRequestBussinesOneUbicacionesBodega(req: Request, res: Response) {
        try {
            const { bodega } = req.body;
            const dataResponse = await this.peticionBussinesOne.sendHttpRequestBussinesOneUbicacionesBodega(bodega);
            return res.status(200).json(response.success(200, "Se obtuvo las ubicaciones de la bodega", dataResponse));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json(response.failed(500, error.message, new Date().toISOString()));
            }
        }
    }
}