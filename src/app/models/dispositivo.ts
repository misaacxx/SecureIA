import { Inmueble } from "./inmueble"

export class Dispositivo{
    id_dispositivo:number=0
    tipo_dispositivo:string=""
    ubicacion_dispositivo:string=""
    estado_dispositivo:string=""
    id_inmueble:Inmueble=new Inmueble()
} 