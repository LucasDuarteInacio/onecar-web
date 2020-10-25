import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) { }

  public addVaga(vaga: any) {
    return this.http.post(`${environment.baseUrl}/vaga`, vaga);
  }

  public buscarTodos(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/vaga`);
  }

  public buscarPorId(id:number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/vaga/${id}`);
  }

}
