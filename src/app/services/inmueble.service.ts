import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Inmueble } from '../models/inmueble';
import { Menor3dispositivosDTO } from '../models/Menor3dispositivosDTO';


const base_url=enviroment.base 
@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private url=`${base_url}/inmueble`

  private listaCambio =new Subject<Inmueble[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Inmueble[]>(`${this.url}/listar`);
  }

  insert(inmueb: Inmueble) {
  return this.http.post(`${this.url}/insertar`, inmueb);
  }

  setList(listaNueva:Inmueble[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Inmueble>(`${this.url}/listarid/${id}`);
  }

  update(inmuebact:Inmueble){
    return this.http.put(`${this.url}/modificar`,inmuebact) 
  }

  deleteA(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

   //HU64: Valery Pari
  //listarMenor3dispositivosActivos
    getlistarMenor3dispositivosActivos():Observable<Menor3dispositivosDTO[]>{
      return this.http.get<Menor3dispositivosDTO[]>(`${this.url}/listarMenor3dispositivosActivos`)
    }
}
