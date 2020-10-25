import { Cliente } from './Cliente';
import { Recibo } from './recibo';

export class Pagamento {
    constructor(
        public id?: number,
        public tipo?: string,
        public valor?: number,
    ) { }
}