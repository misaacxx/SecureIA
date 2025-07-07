import { Inmueble } from "./inmueble"

export class Zonadeteccion{
    id_zona:number=0
    nombre_zona:string=""
    coordenada_zona:string=""
    monitoreoActivo_zona:Boolean=false
    id_inmueble:Inmueble=new Inmueble()
} 