import { EventoDispositivo } from "./eventodispositivo"


export class Reconocimiento{
    id_reconocimiento:number=0
    img_url_reconocimiento:string=""
    identificado_reconocimiento:boolean=false
    fechaHora_reconocimiento:Date=new Date()
    id_evento_dispositivo:EventoDispositivo=new EventoDispositivo()
} 