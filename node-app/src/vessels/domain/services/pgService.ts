import { Logger } from '../../../shared/domain/logger';
import { PgClient } from '../../../shared/domain/services/pgClient';
import { UpdateRequest } from '../../aplication/interfaces/update-request';
import { SearchRequest } from '../../aplication/interfaces/search-request';

export class PGService {
    constructor (
        private readonly pool: PgClient,
        private readonly logger: Logger
    ) {}

    async addLot (lot: JSON): Promise<void> {
        this.logger.info('Adding lot');
        const query = 'SELECT add_lot($1);';
        await this.pool.runQuery(query,[lot]);
        this.logger.info('Lot added');
    }
    async updateState (updateRequest: UpdateRequest) {
        this.logger.info('Updating state');
        const query = 'SELECT update_state($1,$2);';
        const response = await this.pool.runQuery(query,[updateRequest.lot, updateRequest.state]);
        this.logger.info('State updated');
        return response;
    }

    async totalByState (state?: number) {
        this.logger.info('Searching total by state');
        const query = 'select * from total_by_state($1);';
        const response = await this.pool.runQuery(query,[state]);
        this.logger.info('Total by state searched');
        return response;
    }

    async searchByState  (searchRequest: SearchRequest) {
        this.logger.info('Searching by state');
        const query = 'select * from search_by_state($1,$2,$3);';
        const response = await this.pool.runQuery(query,[searchRequest.state, searchRequest.offset, searchRequest.limit]);
        this.logger.info('Searched by state');
        return response;
    }


}