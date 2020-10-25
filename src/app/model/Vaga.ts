import { Recibo } from './recibo';
import { Veiculo } from './Veiculo';

export class Vaga{
    constructor(
     public id?: number,
     public status?: Boolean,
     public statusOcupacao?: Boolean,
     public recibo?: Recibo
    ){}
 }