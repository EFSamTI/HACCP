import { Router } from "express";
import { peticionController } from "../dependencies";



const peticionRoute  = Router();
//peticionRoute.post('/peticion', peticionController.createPeticion.bind(peticionController));
peticionRoute.post('/bussines-one-bodega', peticionController.sendHttpRequestBussinesOneBodega.bind(peticionController));
peticionRoute.post('/bussines-one-ubicaciones', peticionController.sendHttpRequestBussinesOneUbicacionesBodega.bind(peticionController));

export { peticionRoute };