import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Actividad } from '../../../models/actividad';
import { Usuario } from '../../../models/usuario';
import { ActividadService } from '../../../services/actividad.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditaractividad',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatDatepickerModule,MatTimepickerModule,
    RouterLink,MatIconModule],
  templateUrl: './insertareditaractividad.component.html',
  styleUrl: './insertareditaractividad.component.css'
})
export class InsertareditaractividadComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //
  
  form: FormGroup=new FormGroup({})
  actividad:Actividad=new Actividad()
  listadeUsuarios:Usuario[]=[] //para la lista A SELECCIONAR


  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private activS:ActividadService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private usuS:UsuarioService, //service del FK
        private route:ActivatedRoute,
        private loginService: LoginService
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodiActividad:[''], //solo de muestra
        tipoActi:['',[Validators.required,Validators.maxLength(20)]],
        DescripActi:['',[Validators.required,Validators.maxLength(250)]],
        FechayHora:['',Validators.required],
        idUserACTIV:['',Validators.required]
      })

      this.usuS.list().subscribe(data=>{
        this.listadeUsuarios=data //carga la lista de usuarios
      })

  }


  aceptar(){
  if(this.form.valid){
    this.actividad.id_actividad=this.form.value.CodiActividad
    this.actividad.tipo_actividad=this.form.value.tipoActi
    this.actividad.descripcion_actividad=this.form.value.DescripActi
    //this.actividad.fechaHora_actividad = this.form.value.FechayHora;

    // Corrige el desfase de zona horaria(+5) DATETIMEPICKER
    const fechaForm: string = this.form.value.FechayHora; // tipo string modo "2025-06-21T01:30"
    const fecha = new Date(fechaForm);
    const fechaAjust = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
    this.actividad.fechaHora_actividad = fechaAjust;//asignado hora y fecha

    this.actividad.id_usuario.id_usuario=this.form.value.idUserACTIV

     if(this.edicion){
        this.activS.update(this.actividad).subscribe(data=>{
           this.activS.list().subscribe(data=>{
             this.activS.setList(data)})
               this.openSnackBar('Se actualizó con éxito', 'Aceptar');

        })
      } else{
        this.activS.insert(this.actividad).subscribe(data=>{
            this.activS.list().subscribe(data=>{
              this.activS.setList(data)})
               this.openSnackBar('Registrado con éxito', 'Aceptar');

        })
      } 

      this.router.navigate(['actividades'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.activS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodiActividad:new FormControl(data.id_actividad), //solo de muestra
            tipoActi:new FormControl(data.tipo_actividad),
            DescripActi:new FormControl(data.descripcion_actividad),
            FechayHora:new FormControl(data.fechaHora_actividad),
            idUserACTIV:new FormControl(data.id_usuario.id_usuario)
        })
      })
    }
  }


  role:string=""
  
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  
  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }

  isIndependiente() {
    return this.role === 'ROLE_INDEPENDIENTE';
  }

  
  isPadreFamilia() {
    return this.role === 'ROLE_PADRE_FAMILIA';
  }
}
