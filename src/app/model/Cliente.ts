import { Veiculo } from './Veiculo';

export class Cliente{
    constructor(
     public id?: number,
     public nome?: string,
     public cpf?:  string,
     public email?: string,
     public veiculo?: Array<Veiculo>,
     
    ){}
 }