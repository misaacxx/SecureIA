import { Inmueble } from "./inmueble"

export class Geolocalizacion{
    id_geo:number=0
    latitud:number=0
    longitud:number=0
    direccion_geo:string=""
    referencia_geo:string=""
    id_inmueble:Inmueble=new Inmueble()
} 