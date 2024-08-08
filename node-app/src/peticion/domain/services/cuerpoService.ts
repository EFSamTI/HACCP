import { Logger } from "../../../shared/domain/logger";
import { PgClient } from "../../../shared/domain/services/pgClient";
import { ResponseSearchRequestByType } from "../../aplication/interfaces/response-search-request";


export class CuerpoService {
    constructor(
      private readonly pool: PgClient,
      private readonly logger: Logger
    ) {}
    async searchRequestByType(tipo: string): Promise<ResponseSearchRequestByType> {
      this.logger.info(`Searching request by type ${tipo}`);
      const query = 'SELECT * FROM search_request_by_type($1);';
      const response:any = await this.pool.runQuery(query,[tipo]);
      const result: ResponseSearchRequestByType = response[0];
      this.logger.info('Request searched');
      return result;
    }
}


