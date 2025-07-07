import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Zonadeteccion } from '../models/zonadeteccion';
import { enviroment } from '../../environments/environment';
import { CantZonasMonitoriadasDTO } from '../models/CantZonasMonitoriadasDTO';
import { ZonasconMayorCantReconocimientoDTO } from '../models/ZonasconMayorCantReconocimientoDTO';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class ZonadeteccionService {

  private url=`${base_url}/zona_deteccion`

  private listaCambio =new Subject<Zonadeteccion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Zonadeteccion[]>(`${this.url}/listar`);
  }

  insert(zon: Zonadeteccion) {
  return this.http.post(`${this.url}/insertar`, zon);
  }

  setList(listaNueva:Zonadeteccion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Zonadeteccion>(`${this.url}/listarid/${id}`);
  }

  update(zonaACT:Zonadeteccion){
    return this.http.put(`${this.url}/modificar`,zonaACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

  //HU68: Alberto Avila
  //CantidadZonasMonitoriadasActivasxInmueble
  getCantZonasMonitoActivasxInmueble():Observable<CantZonasMonitoriadasDTO[]>{
    return this.http.get<CantZonasMonitoriadasDTO[]>(`${this.url}/CantidadZonasMonitoriadasActivasxInmueble`)
  }

  //HU76: Valery Pari
  //listarZonasconMayorCantReconocimiento
   getListarZonasconMayorCantRecono():Observable<ZonasconMayorCantReconocimientoDTO[]>{
    return this.http.get<ZonasconMayorCantReconocimientoDTO[]>(`${this.url}/listarZonasconMayorCantReconocimiento`)
  }
 



}
