import { Request, Response } from "express";
import { PGService } from "../../domain/services/pgService";

import { UpdateRequest } from "../../aplication/interfaces/update-request";
import { SearchRequest } from "../../aplication/interfaces/search-request";
import { VesselLotInformation } from '../../aplication/usercases/vessel-lot-information';
import { response } from "../../../shared/infrastructure/dependencies";
export class HaccpController {
    constructor(
        private readonly pgService: PGService,
        private readonly VesselLotInformation: VesselLotInformation
    ) {}
    async addLot(req: Request, res: Response) {
        try {
            const lot = req.body;
            await this.pgService.addLot(lot);
            return res.status(201).json(response.success( "Lote agregado"));
        } catch (error) {
            return response.handleError(res, error);
        }
    }

    async updateState(req: Request, res: Response) {
        try {
            const { lot, state } = req.body as UpdateRequest;
            const updateRequest = { lot, state };
            const lotUpdate = await this.pgService.updateState(updateRequest);
            return res.status(200).json(response.success("Estado actualizado", lotUpdate, lotUpdate.length));
        } catch (error) {
            return response.handleError(res, error);
        }
    }

    async searchByState (req: Request, res: Response) {
        try {
            const { state, offset, limit } = req.body as SearchRequest; 
            const searchRequest = { state, offset, limit };
            const [total, data] = await Promise.all([
                this.pgService.totalByState(searchRequest.state),
                this.pgService.searchByState(searchRequest)
            ]);
            const items = {
                total: total,
                data: data
            };
            return res.status(200).json(response.success("Búsqueda por estado", items));
        } catch (error) {
            return response.handleError(res, error);
        }
    }

    async vesselLotInfo(req: Request, res: Response) {
        try {
            const { lot } = req.body;
            console.log("lot" + lot);
            const vesselLotInfo = await this.VesselLotInformation.fetchVesselLotInfo(lot);
            return res.status(200).json(response.success("Información de lote de embarcación", vesselLotInfo, vesselLotInfo.length));
        } catch (error) {
            return response.handleError(res, error);
        }
    }
}