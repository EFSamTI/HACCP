import { PgClient } from "../../shared/domain/services/pgClient";
import { logger } from "../../shared/infrastrucutre/dependencies";
import { PGService } from "../domain/services/pgService";
import { HaccpController } from "./rest-api/hccp-controller";

export const pgClient = new PgClient();

const pgServie = new PGService(pgClient, logger);

export const haccpController = new HaccpController(pgServie);