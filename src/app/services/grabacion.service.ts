import { Injectable } from '@angular/core';
import { Grabacion } from '../models/grabacion';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../environments/environment';
import { ContarGrabacionesxFechaDTO } from '../models/ContarGrabacionesxFechaDTO';
import { PromedioGrabDTO } from '../models/PromedioGrabDTO';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class GrabacionService {


  private url=`${base_url}/grabacion`

  private listaCambio =new Subject<Grabacion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Grabacion[]>(`${this.url}/listar`);
  }

  insert(GRAB: Grabacion) {
  return this.http.post(`${this.url}/insertar`, GRAB);
  }

  setList(listaNueva:Grabacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Grabacion>(`${this.url}/listarid/${id}`);
  }

  update(grabACT:Grabacion){
    return this.http.put(`${this.url}/modificar`,grabACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

    //HU69: Ernie Cossio
    //ContarGrabacionesxFecha
    getContarGrabaxFecha(valor:Date=new Date()):Observable<ContarGrabacionesxFechaDTO[]>{
      const params={fecha:valor.toISOString().split('T')[0]}
      return this.http.get<ContarGrabacionesxFechaDTO[]>(`${this.url}/ContarGrabacionesxFecha`,{params})
    }

   //HU70: Ernie Cossio
    //PromedioTiempoGrabacionesxIdReco
    getPromedioGrabxIDReco(valor:number):Observable<PromedioGrabDTO[]>{
      const params={ingresarId:valor}
      return this.http.get<PromedioGrabDTO[]>(`${this.url}/PromedioTiempoGrabacionesxIdReco`,{params})
    }
}
