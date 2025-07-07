import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Reconocimiento } from '../models/reconocimiento';
import { HttpClient } from '@angular/common/http';
import { CantidadReconocimientosxDiaEspecificoDTO } from '../models/CantidadReconocimientosPorDiaDTO';
import { CantidadReconocimientosxIdInmuebleDTO } from '../models/CantidadReconocimientosxIdInmuebleDTO';

const base_url=enviroment.base //base

@Injectable({
  providedIn: 'root'
})
export class ReconocimientoService {


  private url=`${base_url}/reconocimiento`

  private listaCambio =new Subject<Reconocimiento[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Reconocimiento[]>(`${this.url}/listar`);
  }

  insert(RECO: Reconocimiento) {
  return this.http.post(`${this.url}/insertar`, RECO);
  }

  setList(listaNueva:Reconocimiento[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Reconocimiento>(`${this.url}/listarid/${id}`);
  }

  update(recoACT:Reconocimiento){
    return this.http.put(`${this.url}/modificar`,recoACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }

  //buscarreconoxTipoEvento
    //HU65: Dante Carhuaz
   //ListarReconocimientoxTipoEvento
  SearchRecoxTipoEvento(valor:string){
    const params={tipo:valor}
    return this.http.get<Reconocimiento[]>(`${this.url}/ListarReconocimientoxTipoEvento`,{params})
  }

   //HU73: Dante Carhuaz
   //CantidadReconocimientosxDiaEspecifico
  getCantRecoxDIAEspecif(valor:Date=new Date()):Observable<CantidadReconocimientosxDiaEspecificoDTO[]>{
    const params={Ingresar_Fecha:valor.toISOString().split('T')[0]}
    return this.http.get<CantidadReconocimientosxDiaEspecificoDTO[]>(`${this.url}/CantidadReconocimientosxDiaEspecifico`,{params})
  }

  //HU75: Alberto Avila
  //CantidadReconocimientosxIdInmueble
  getCantRecoxIdInmueble(valor:number):Observable<CantidadReconocimientosxIdInmuebleDTO[]>{
    const params={id:valor}
    return this.http.get<CantidadReconocimientosxIdInmuebleDTO[]>(`${this.url}/CantidadReconocimientosxIdInmueble`,{params})
  }

}
