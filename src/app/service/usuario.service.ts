import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public login(usuario:any){
    return this.http.post(`${environment.baseUrl}/usuario/login`, usuario);
  }

  public addUsuario(usuario:any){
    return this.http.post(`${environment.baseUrl}/usuario`, usuario);
  }

  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/usuario`);
  }



}
