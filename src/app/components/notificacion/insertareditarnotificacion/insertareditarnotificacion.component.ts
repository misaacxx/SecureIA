import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Notificacion } from '../../../models/notificacion';
import { Usuario } from '../../../models/usuario';
import { Reconocimiento } from '../../../models/reconocimiento';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ReconocimientoService } from '../../../services/reconocimiento.service';
import {MatCheckboxModule} from '@angular/material/checkbox';//modul checkbox
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarnotificacion',
   providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatIconModule,MatRadioModule,MatCheckboxModule,
    RouterLink], 
  templateUrl: './insertareditarnotificacion.component.html',
  styleUrl: './insertareditarnotificacion.component.css'
})
export class InsertareditarnotificacionComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  notiNueva:Notificacion=new Notificacion()
  listadeUsuarios:Usuario[]=[] //para la lista A SELECCIONAR 1erFK
  listadeReconocimientos:Reconocimiento[]=[]

  id:number=0 //listid
  edicion:boolean=false//edicion


  listaCategoriasNotif: { value: string; viewValue: string }[] = [
    { value: 'Acceso No Autorizado', viewValue: 'Acceso No Autorizado' },
    { value: 'Intrusión Detectada', viewValue: 'Intrusión Detectada' },
    { value: 'Rostro No Reconocido', viewValue: 'Rostro No Reconocido' },
    { value: 'Persona Reconocida', viewValue: 'Persona Reconocida' },
    { value: 'Zona Restringida', viewValue: 'Zona Restringida' },
    { value:  'Actividad Sospechosa' , viewValue: 'Actividad Sospechosa' },
    { value: 'Alerta Manual', viewValue: 'Alerta Manual' }
  ];


    constructor(
        private notiS:NotificacionService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private usuS:UsuarioService, //service del 1ERFK
        private recoS:ReconocimientoService, //service del 2doFK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodNoti:[''], //solo de muestra
        Catego:['',Validators.required],
        Detal: ['',[Validators.required, Validators.maxLength(250)]],
        AlarmaAct:[false],
        idrecoNOTI:['',Validators.required],
        iduserNOTI:['',Validators.required]
      })

      this.usuS.list().subscribe(data=>{
        this.listadeUsuarios=data //carga la lista de usuariosFK
      })

      this.recoS.list().subscribe(data=>{
        this.listadeReconocimientos=data //carga la lista de reconocimientosFK
      })      

  }


  aceptar(){
  if(this.form.valid){
    this.notiNueva.id_notificacion=this.form.value.CodNoti
    this.notiNueva.categoria_notificacion=this.form.value.Catego
    this.notiNueva.detalle_notificacion=this.form.value.Detal
    this.notiNueva.alarmaActivada_notificacion = this.form.value.AlarmaAct
    this.notiNueva.id_reconocimiento.id_reconocimiento=this.form.value.idrecoNOTI
    this.notiNueva.id_usuario.id_usuario=this.form.value.iduserNOTI

     if(this.edicion){
        this.notiS.update(this.notiNueva).subscribe(data=>{
           this.notiS.list().subscribe(data=>{
             this.notiS.setList(data)})
               this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.notiS.insert(this.notiNueva).subscribe(data=>{
            this.notiS.list().subscribe(data=>{
              this.notiS.setList(data)})
                this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['notificaciones'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.notiS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodNoti:new FormControl(data.id_notificacion), //solo de muestra
            Catego:new FormControl(data.categoria_notificacion),
            Detal:new FormControl(data.detalle_notificacion),
            AlarmaAct:new FormControl(data.alarmaActivada_notificacion),
            idrecoNOTI:new FormControl(data.id_reconocimiento.id_reconocimiento),
            iduserNOTI:new FormControl(data.id_usuario.id_usuario)
        })
      })
    }
  }

}
