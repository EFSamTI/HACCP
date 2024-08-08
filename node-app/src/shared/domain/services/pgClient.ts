import pool from "../../infrastrucutre/database/pool";
import { logger } from "../../infrastrucutre/dependencies";

export class PgClient{
  async runQuery(query: string, params: any[]) {
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
        }
        throw error;
    } finally {
        client.release(); 
    }
}
}