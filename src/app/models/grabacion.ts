import { Reconocimiento } from "./reconocimiento"

export class Grabacion{
    id_grabacion:number=0
    url_grabacion:string=""
    horainicio_grabacion:string="" //viene como Local time ->date a usar en pickertime
    duracionSeg_grabacion:Date=new Date()
    id_reconocimiento:Reconocimiento=new Reconocimiento()
} 