import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../models/notificacion';
import { HttpClient } from '@angular/common/http';
import { CantidadNotiSegunCategoDTO } from '../models/CantidadNotiSegunCategoDTO';


const base_url=enviroment.base //base

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private url=`${base_url}/notificacion`

  private listaCambio =new Subject<Notificacion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Notificacion[]>(`${this.url}/listar`);
  }

  insert(noti: Notificacion) {
  return this.http.post(`${this.url}/insertar`, noti);
  }

  setList(listaNueva:Notificacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/listarid/${id}`);
  }

  update(notiACT:Notificacion){
    return this.http.put(`${this.url}/modificar`,notiACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  } 
  
    //HU66: Dante Carhuaz
    //CantidadNotiSegunsuCategoría
    getCantidadNotiSegunsuCategoria(valor:string):Observable<CantidadNotiSegunCategoDTO[]>{
      const params={Ingresar_Categoria:valor}
      return this.http.get<CantidadNotiSegunCategoDTO[]>(`${this.url}/CantidadNotiSegunsuCategoría`,{params})
    }
}
