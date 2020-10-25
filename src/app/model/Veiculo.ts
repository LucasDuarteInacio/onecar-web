import { Cliente } from './Cliente';
import { Recibo } from './recibo';

export class Veiculo{
    constructor(
     public id?: number,
     public placa?: string,
     public modelo?: string,
     public cor?: string,
     public tipo?: string,
     public cliente?: Cliente,
     public recibo?: Recibo
    ){}
 }