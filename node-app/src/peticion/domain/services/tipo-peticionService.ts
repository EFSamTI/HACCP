import { TipoPeticion } from "../entities/tipo-peticion";


export class TipoPeticionService {
    constructor() {}
    async findOrCreate(tipo: string, url:string) {
        const tipoExistente = await TipoPeticion.findOne({
            where: { type_name: tipo },
        });
    
        if (!tipoExistente) {
            const tipoNuevo = await TipoPeticion.create({
                type_name: tipo,
                url: url
            }).save();
            return tipoNuevo;
        }
        return tipoExistente;
    }

    async getById(id: number) {
        return await TipoPeticion.findOne({
            where: { type_id: id },
        });
    }

}


