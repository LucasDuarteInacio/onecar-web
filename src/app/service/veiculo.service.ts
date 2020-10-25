import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http:HttpClient) { }

  public addVeiculo(veiculo:any){
    return this.http.post(`${environment.baseUrl}/veiculo`, veiculo);
  }

  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/veiculo`);
  }

  public buscarVeiculoPorCliente(idCliente:number): Observable<any>{
    return this.http.get(`${environment.baseUrl}/veiculo/cliente/${idCliente}`);
  }
  
}
