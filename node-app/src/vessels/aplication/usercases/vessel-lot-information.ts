import { HttpRequest } from "../../../shared/domain/interfaces/http-request";
import { Logger } from "../../../shared/domain/logger";
import { config } from "../../../shared/infrastructure/config";
import { sendHttpRequest } from "../../../shared/infrastructure/rest/sendHttpRequest";

export class VesselLotInformation {
  constructor(private readonly logger: Logger) {}
  async fetchVesselLotInfo(lot: string) {
    console.log("lotwe" + lot);
    this.logger.info("Fetching vessel lot information");
    const { url, source, destination, operation, verb, path } = config.middleware;
    const bodyRequest: HttpRequest = { url: url, source: source, destination: destination, operation: operation, verb: verb, path: `${path}/?vessel_lot=${lot}`, body: null, feedback: null};
    const response = await sendHttpRequest(bodyRequest);
    this.logger.info("Vessel lot information fetched");
    return response;
  }
}
