import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

  constructor(private http:HttpClient) { }

  public addRecibo(recibo:any){
    return this.http.post(`${environment.baseUrl}/recibo`, recibo);
  }

  public pagarRecibo(recibo:any){
    return this.http.post(`${environment.baseUrl}/recibo/pagamento`, recibo);
  }


  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/recibo`);
  }

  public buscarAtivos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/recibo/ativo`);
  }

  public buscarReciboPorId(id:number): Observable<any>{
    return this.http.get(`${environment.baseUrl}/recibo/${id}`);
  }

}