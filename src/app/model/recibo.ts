
import { Vaga } from './Vaga';
import { Veiculo } from './Veiculo';
import { Pagamento } from './Pagamento';

export class Recibo {
    constructor(
        public id?: number,
        public entrada?: String,
        public saida?: String,
        public status?: Boolean,
        public vaga?: Vaga,
        public pagamento?: Pagamento,
        public veiculo?: Veiculo,
    ) { }
}