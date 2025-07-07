import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { CantidadUsuariosxMesyAnioDTO } from '../models/CantidadUsuariosxMesyAnioDTO';


const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

 private url=`${base_url}/usuario`

  private listaCambio =new Subject<Usuario[]>

  constructor(private http:HttpClient) { }


  list() {

    return this.http.get<Usuario[]>(`${this.url}/listar`);
    }
  
    insert(u: Usuario) {
    return this.http.post(`${this.url}/insertar`, u);
    }
  
    setList(listaNueva:Usuario[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
     return this.listaCambio.asObservable()
    }
  
    listId(id:number){
      return this.http.get<Usuario>(`${this.url}/listarid/${id}`);
    }
  
    update(uact:Usuario){
      return this.http.put(`${this.url}/modificar`,uact) 
    }
  
    deleteA(id:number){
      return  this.http.delete(`${this.url}/eliminar/${id}`)
    }

    //HU61: Valery Pari
    //buscarusuarioxnombre
    SearchUserxNombre(valor:string){
      const params={nombre:valor}
      return this.http.get<Usuario[]>(`${this.url}/buscaruserxname`,{params})
    }



    //HU62: Valery Pari
    //cantidadUsersxMonthxYear
    getCantUsuariosxMesyAnio(valor1: number, valor2: number): Observable<CantidadUsuariosxMesyAnioDTO[]>{
      const params = { year:valor1, month:valor2}

      return this.http.get<CantidadUsuariosxMesyAnioDTO[]>(`${this.url}/cantidadUsersxMonthxYear`,{params})
    }
}
