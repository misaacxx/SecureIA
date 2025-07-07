import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Rol } from '../models/rol';
import { HttpClient } from '@angular/common/http';
import { CantidadUsuariosxTipoRolDTO } from '../models/CantidadUsuariosxTipoRolDTO';


const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class RolService {

  private url=`${base_url}/rol`

  private listaCambio =new Subject<Rol[]>

  constructor(private http:HttpClient) { }

  list() {
  return this.http.get<Rol[]>(`${this.url}/listar`);
  }

  insert(r: Rol) {
  return this.http.post(`${this.url}/insertar`, r);
  }

  setList(listaNueva:Rol[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Rol>(`${this.url}/listarid/${id}`);
  }

  update(ract:Rol){
    return this.http.put(`${this.url}/modificar`,ract) 
  }

  deleteA(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

  //HU63: Valery Pari
  //cantidadUsersxTypeRol
  getCantidadUsersxTypeRol():Observable<CantidadUsuariosxTipoRolDTO[]>{
    return this.http.get<CantidadUsuariosxTipoRolDTO[]>(`${this.url}/cantidadUsersxTypeRol`)
  }
}
