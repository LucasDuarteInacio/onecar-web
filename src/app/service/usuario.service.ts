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

  public addAvatar(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`${environment.baseUrl}/usuario/avatar/1`, formData);
  }

  public buscarTodos(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/usuario`);
  }

  public buscarUsuarioPorId(id): Observable<any>{
    return this.http.get(`${environment.baseUrl}/usuario/${id}`);
  }


}
