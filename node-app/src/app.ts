import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { peticionRoute } from './peticion/infraestructure/rest-api/peticion-route';
import { haccpRoute } from './vessels/infraestructure/rest-api/haccp-route';

const app = express();

const apiUrl = '/v1/api';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(apiUrl,peticionRoute);
app.use(apiUrl,haccpRoute);


export default app;