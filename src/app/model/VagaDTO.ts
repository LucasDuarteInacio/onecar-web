import { Recibo } from './recibo';
import { Veiculo } from './Veiculo';

export class VagaDTO{
    constructor(
     public id?: number,
     public status?: Boolean,
     public statusOcupacao?: Boolean,
     public recibo?: Recibo,
     public placa?: Recibo

    ){}
 }