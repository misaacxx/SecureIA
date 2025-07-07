import { Usuario } from "./usuario"

export class Actividad{
    id_actividad:number=0
    tipo_actividad:string=""
    descripcion_actividad:string=""
    fechaHora_actividad:Date=new Date()
    id_usuario:Usuario=new Usuario()
} 