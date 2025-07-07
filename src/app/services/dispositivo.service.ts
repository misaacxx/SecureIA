import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Dispositivo } from '../models/dispositivo';
import { HttpClient } from '@angular/common/http';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class DispositivoService {

  private url=`${base_url}/dispositivo`

  private listaCambio =new Subject<Dispositivo[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Dispositivo[]>(`${this.url}/listar`);
  }

  insert(dispo: Dispositivo) {
  return this.http.post(`${this.url}/insertar`, dispo);
  }

  setList(listaNueva:Dispositivo[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Dispositivo>(`${this.url}/listarid/${id}`);
  }

  update(dispoACT:Dispositivo){
    return this.http.put(`${this.url}/modificar`,dispoACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
