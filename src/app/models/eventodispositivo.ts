import { Dispositivo } from "./dispositivo"


export class EventoDispositivo{
    id_evento:number=0
    tipo_evento:string=""
    descripcion_evento:string=""
    fechaHora_evento:Date=new Date()
    nivelAlerta_evento:string=""
    id_dispositivo:Dispositivo=new Dispositivo()
} 