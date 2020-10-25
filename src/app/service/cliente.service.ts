import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  public addCliente(cliente:any){
    return this.http.post(`${environment.baseUrl}/cliente`, cliente);
  }

  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/cliente`);
  }

} 
