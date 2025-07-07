import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Actividad } from '../models/actividad';
import { HttpClient } from '@angular/common/http';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private url=`${base_url}/actividad`

  private listaCambio =new Subject<Actividad[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Actividad[]>(`${this.url}/listar`);
  }

  insert(activ: Actividad) {
  return this.http.post(`${this.url}/insertar`, activ);
  }

  setList(listaNueva:Actividad[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Actividad>(`${this.url}/listarid/${id}`);
  }

  update(actividadACT:Actividad){
    return this.http.put(`${this.url}/modificar`,actividadACT) 
  }

  deleteA(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
