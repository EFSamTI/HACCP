import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { peticionRoute } from './peticion/infraestructure/rest-api/peticion-route';

const app = express();
//const apiAuthUrl = '/auth';
const apiUrl = '/api/v1';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(apiUrl,peticionRoute);



export default app;