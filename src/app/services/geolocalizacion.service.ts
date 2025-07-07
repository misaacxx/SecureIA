import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Geolocalizacion } from '../models/geolocalizacion';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class GeolocalizacionService {

  private url=`${base_url}/geolocalizacion`

  private listaCambio =new Subject<Geolocalizacion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Geolocalizacion[]>(`${this.url}/listar`);
  }

  insert(geo: Geolocalizacion) {
  return this.http.post(`${this.url}/insertar`, geo);
  }

  setList(listaNueva:Geolocalizacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Geolocalizacion>(`${this.url}/listarid/${id}`);
  }

  update(geoACT:Geolocalizacion){
    return this.http.put(`${this.url}/modificar`,geoACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

  //buscargeolocalizacionxIdInmueble
  SearchGeoxIdInmu(valor:number){
    const params={idInmueble:valor}
    return this.http.get<Geolocalizacion[]>(`${this.url}/findByInmuebleId`,{params})
  }

  //buscargeolocalizacionxIdZona
  SearchGeoxIdZona(valor:number){
    const params={idZona:valor}
    return this.http.get<Geolocalizacion[]>(`${this.url}/findGeolocalizacionesByZona`,{params})
  }
}
