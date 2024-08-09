import { PgClient } from "../../shared/domain/services/pgClient";
import { logger } from "../../shared/infrastructure/dependencies";
import { VesselLotInformation } from "../aplication/usercases/vessel-lot-information";
import { PGService } from "../domain/services/pgService";
import { HaccpController } from "./rest-api/hccp-controller";

export const pgClient = new PgClient();

const pgServie = new PGService(pgClient, logger);
const vesselLotInformation = new VesselLotInformation(logger);

export const haccpController = new HaccpController(pgServie, vesselLotInformation);