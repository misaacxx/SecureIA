import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Dispositivo } from '../models/dispositivo';
import { EventoDispositivo } from '../models/eventodispositivo';
import { HttpClient } from '@angular/common/http';
import { CantidadEventosAlertaAltaxTipoDispositivoDTO } from '../models/CantidadEventosAlarmaAltaxTipoDispositivoDTO';
import { CantidadEventosPorIdInmuebleDTO } from '../models/CantidadEventosPorIdInmuebleDTO';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class EventodispositivoService {


  private url=`${base_url}/evento_dispositivo`

  private listaCambio =new Subject<EventoDispositivo[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<EventoDispositivo[]>(`${this.url}/listar`);
  }

  insert(EVET: EventoDispositivo) {
  return this.http.post(`${this.url}/insertar`, EVET);
  }

  setList(listaNueva:EventoDispositivo[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<EventoDispositivo>(`${this.url}/listarid/${id}`);
  }

  update(eventACT:EventoDispositivo){
    return this.http.put(`${this.url}/modificar`,eventACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

  //HU67:Alberto
  //CantidadEventosAlertaAltaxTipoDispositivo
  getCantEventAlertxTDispo():Observable<CantidadEventosAlertaAltaxTipoDispositivoDTO[]>{
    return this.http.get<CantidadEventosAlertaAltaxTipoDispositivoDTO[]>(`${this.url}/CantidadEventosAlertaAltaxTipoDispositivo`)
  }
  
  //HU74: Alberto Rafael
  //CantidadEventosPorIdInmueble
  getCantEventxIdInmueble(valor:number):Observable<CantidadEventosPorIdInmuebleDTO[]>{
    const params={id:valor}
    return this.http.get<CantidadEventosPorIdInmuebleDTO[]>(`${this.url}/CantidadEventosPorIdInmueble`,{params})
  }
}
