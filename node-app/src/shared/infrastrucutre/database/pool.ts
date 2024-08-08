import { Pool } from 'pg';
import { config } from '../config';

const { host, port, user, password, database } = config.database;

const pool = new Pool({
    host,
    port: Number(port),
    user,
    password,
    database
});


export default pool;