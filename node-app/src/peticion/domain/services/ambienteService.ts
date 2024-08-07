import { AmbientePeticion } from "../entities/ambiente";
import { get } from 'http';


export class AmbienteService {
    constructor() {}
    async findOrCreate(ambiente: string) {
        const ambienteExistente = await AmbientePeticion.findOne({
            where: { environment_name: ambiente },
        });
    
        if (!ambienteExistente) {
            const ambienteNuevo = await AmbientePeticion.create({
                environment_name: ambiente
            }).save();
            return ambienteNuevo;
        }
        return ambienteExistente;
    }

    async getById(id: number) {
        return await AmbientePeticion.findOne({
            where: { environment_id: id },
        });
    }
    
}
