import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PerfilUsuario } from '../../../models/perfilusuario';
import { Usuario } from '../../../models/usuario';
import { PerfilusuarioService } from '../../../services/perfilusuario.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatRadioButton } from '@angular/material/radio';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio'; //Seleccion por boton
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-insertareditarperfilusuario',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatRadioButton,MatIconModule,MatRadioModule,
    RouterLink,MatIconModule],
  templateUrl: './insertareditarperfilusuario.component.html',
  styleUrl: './insertareditarperfilusuario.component.css'
})
export class InsertareditarperfilusuarioComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  perfilusuario:PerfilUsuario=new PerfilUsuario()
  listadeUsuarios:Usuario[]=[] //para la lista A SELECCIONAR

  id:number=0 //listid
  edicion:boolean=false//edicion


    listaZonasHorarias: {value: string; viewValue: string}[] = [
      { value: 'America/Lima', viewValue: 'Lima (UTC-5)' },
      { value: 'America/Bogota', viewValue: 'Bogotá (UTC-5)' },
      { value: 'America/Mexico_City', viewValue: 'Ciudad de México (UTC-6)' },
      { value: 'America/Santiago', viewValue: 'Santiago (UTC-4)' },
      { value: 'America/Caracas', viewValue: 'Caracas (UTC-4)' },
      { value: 'America/Argentina/Buenos_Aires', viewValue: 'Buenos Aires (UTC-3)' },
      { value: 'America/Los_Angeles', viewValue: 'Los Ángeles (UTC-8)' },
      { value: 'America/New_York', viewValue: 'Nueva York (UTC-5)' },
      { value: 'Europe/Madrid', viewValue: 'Madrid (UTC+1)' },
      { value: 'Europe/London', viewValue: 'Londres (UTC+0)' }
    ];

    listaLenguajes: {value: string; viewValue: string}[] = [
      { value: 'Español', viewValue: 'Español' },
      { value: 'Inglés', viewValue: 'Inglés' },
      { value: 'Portugués', viewValue: 'Portugués' },
      { value: 'Francés', viewValue: 'Francés' },
      { value: 'Alemán', viewValue: 'Alemán' },
      { value: 'Chino', viewValue: 'Chino (Mandarín)' },
      { value: 'Japonés', viewValue: 'Japonés' }
    ];


    constructor(
        private perfilS:PerfilusuarioService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private usuS:UsuarioService, //service del FK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodPerfil:[''], //solo de muestra
        UsernamePerfil:['', [Validators.required, Validators.maxLength(20)]],
        PrefPriva:['',Validators.required],
        PrefNotif:['',Validators.required],
        ZonaHor:['',Validators.required],
        Lengua:['',Validators.required],
        idUserPERF:['',Validators.required]
      })

      this.usuS.list().subscribe(data=>{
        this.listadeUsuarios=data //carga la lista de usuarios
      })

  }


  aceptar(){
  if(this.form.valid){
    this.perfilusuario.id_perfil=this.form.value.CodPerfil
    this.perfilusuario.username_perfil=this.form.value.UsernamePerfil
    this.perfilusuario.preferencias_privacidad_perfil=this.form.value.PrefPriva
    this.perfilusuario.preferencias_notificacion_perfil = this.form.value.PrefNotif
    this.perfilusuario.zonahoraria_perfil=this.form.value.ZonaHor
    this.perfilusuario.lenguaje_perfil = this.form.value.Lengua
    this.perfilusuario.id_usuario.id_usuario=this.form.value.idUserPERF

     if(this.edicion){
        this.perfilS.update(this.perfilusuario).subscribe(data=>{
           this.perfilS.list().subscribe(data=>{
             this.perfilS.setList(data)})
               this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.perfilS.insert(this.perfilusuario).subscribe(data=>{
            this.perfilS.list().subscribe(data=>{
              this.perfilS.setList(data)})
               this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['perfilusuario'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.perfilS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodPerfil:new FormControl(data.id_perfil), //solo de muestra
            UsernamePerfil:new FormControl(data.username_perfil),
            PrefPriva:new FormControl(data.preferencias_privacidad_perfil),
            PrefNotif:new FormControl(data.preferencias_notificacion_perfil),
            ZonaHor:new FormControl(data.zonahoraria_perfil),
            Lengua:new FormControl(data.lenguaje_perfil),
            idUserPERF:new FormControl(data.id_usuario.id_usuario)
        })
      })
    }
  }
}
