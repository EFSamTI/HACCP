
import { IPeticionDTO } from "../../aplication/interfaces/cuerpo-interface";
import { AmbientePeticion } from "../entities/ambiente";
import { CuerpoPeticion } from "../entities/cuerpo";
import { TipoPeticion } from "../entities/tipo-peticion";


export class CuerpoService {
    constructor() {}
    async getBodega() {
        const data  = await CuerpoPeticion.findOne({
          where: { state: true, tipo: { type_name: "BUSSINES-ONE-BODEGA" } } 
          ,relations: ["tipo", "ambiente"],
        });
        if (!data) return null;
        return data;
      }
      
    async getUbicacionesBodega() {
        const data  = await CuerpoPeticion.findOne({
          where: { state: true, tipo: { type_name: "BUSSINES-ONE-UBICACIONES" } } 
          ,relations: ["tipo", "ambiente"],
        });
        if (!data) return null;
        return data;
    }
    
    async post(peticion:IPeticionDTO, ambiente: AmbientePeticion, tipo: TipoPeticion) {
        const cuerpo = await CuerpoPeticion.create({
          ambiente: ambiente,
          tipo: tipo,
            source: peticion.source,
            destination: peticion.destination,
            operation: peticion.operation,
            verb: peticion.verb,
            path: peticion.path,
            state: true,
        })
        return await cuerpo.save();
    }

    async getById(id: number) {
        return await CuerpoPeticion.findOne({
            where: { id: id },
            relations: ["tipo", "ambiente"],
        });
    }

    async put( cuerpo: CuerpoPeticion, ambiente: AmbientePeticion, tipo: TipoPeticion, creatorId: number) {
        cuerpo.ambiente = ambiente;
        cuerpo.tipo = tipo;
        cuerpo.source = cuerpo.source;
        cuerpo.destination = cuerpo.destination;
        cuerpo.operation = cuerpo.operation;
        cuerpo.verb = cuerpo.verb;
        cuerpo.path = cuerpo.path;
        cuerpo.state = true;
        cuerpo.updateAt = new Date();
        return await cuerpo.save();
    }
}


