import { Reconocimiento } from "./reconocimiento"
import { Usuario } from "./usuario"

export class Notificacion{
    id_notificacion:number=0
    categoria_notificacion:string=""
    detalle_notificacion:string=""
    alarmaActivada_notificacion:boolean=false
    id_reconocimiento:Reconocimiento=new Reconocimiento()
    id_usuario:Usuario=new Usuario()
} 