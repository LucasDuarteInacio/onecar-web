import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http:HttpClient) { }

  public addPagamento(pagamento:any){
    return this.http.post(`${environment.baseUrl}/pagamento`, pagamento);
  }

  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/pagamento`);
  }
}
 