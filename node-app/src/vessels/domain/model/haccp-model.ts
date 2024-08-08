
export class HaccpModel {
    lot: string;
    body: Record<string, any>;
    
    constructor(lot: string, body: any) {
        this.lot = lot;
        this.body = body;
    }

    static fromRow(row: any): HaccpModel {
        return new HaccpModel(row.lot, row.body);
    }
}