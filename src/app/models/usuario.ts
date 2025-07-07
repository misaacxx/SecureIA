import { Rol } from "./rol"

export class Usuario{
    
    id_usuario:number=0
    nombre_usuario:string=""
    dni_usuario:string=""
    correo_usuario:string=""
    sexo_usuario:string=""
    telefono_usuario:string=""
    direccion_usuario:string=""
    img_url_usuario:string=""
    password_usuario:string=""
    fechaRegistro_usuario:Date=new Date()
    id_rol:Rol=new Rol()

}