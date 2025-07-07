import { Usuario } from "./usuario"

export class PerfilUsuario{
    id_perfil:number=0
    username_perfil:string=""
    preferencias_privacidad_perfil:string=""
    preferencias_notificacion_perfil:string=""
    zonahoraria_perfil:string=""
    lenguaje_perfil:string=""
    id_usuario:Usuario=new Usuario()
} 