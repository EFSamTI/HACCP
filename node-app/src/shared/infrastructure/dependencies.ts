

import { PgClient } from "../domain/services/pgClient";
import { HttpResponse } from "./http/response";
import { ConsoleLogger } from "./logger/console-logger";

export const logger = new ConsoleLogger();

export const response = new HttpResponse();

export const pgClient = new PgClient();
