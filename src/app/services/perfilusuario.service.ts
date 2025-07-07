import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { PerfilUsuario } from '../models/perfilusuario';
import { HttpClient } from '@angular/common/http';


const base_url=enviroment.base //base

@Injectable({
  providedIn: 'root'
})
export class PerfilusuarioService {
  

  private url=`${base_url}/perfil_usuario`

  private listaCambio =new Subject<PerfilUsuario[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<PerfilUsuario[]>(`${this.url}/listar`);
  }

  insert(perf: PerfilUsuario) {
  return this.http.post(`${this.url}/insertar`, perf);
  }

  setList(listaNueva:PerfilUsuario[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<PerfilUsuario>(`${this.url}/listarid/${id}`);
  }

  update(perfACT:PerfilUsuario){
    return this.http.put(`${this.url}/modificar`,perfACT) 
  }

  deleteA(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
