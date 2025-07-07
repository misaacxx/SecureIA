import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Dispositivo } from '../../../models/dispositivo';
import { Inmueble } from '../../../models/inmueble';
import { DispositivoService } from '../../../services/dispositivo.service';
import { InmuebleService } from '../../../services/inmueble.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditardispositivo',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatRadioModule,MatIconModule,
    RouterLink],
  templateUrl: './insertareditardispositivo.component.html',
  styleUrl: './insertareditardispositivo.component.css'
})
export class InsertareditardispositivoComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  dispoNuevo:Dispositivo=new Dispositivo()
  listadeInmuebles:Inmueble[]=[] //para la lista A SELECCIONAR FK

  listadeDispos:Dispositivo[]=[]//para la lista de dispo.tipo a seleccionar

  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private dispS:DispositivoService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private inmS:InmuebleService, //service del FK
        private route:ActivatedRoute
      ) { }


  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodDispo:[''], //solo de muestra
        Tipodis:['',Validators.required],
        Ubica:['', [Validators.required, Validators.maxLength(20)]],
        Estado:['',Validators.required],
        idInmuebleDISPO:['',Validators.required]
      })

      this.inmS.list().subscribe(data=>{
        this.listadeInmuebles=data //carga la lista de inmuebles
      })

      ///para la eleccion de tiposDispo, sin repetidas
      this.dispS.list().subscribe(data => {
        const tiposUnicosMap = new Map<string, Dispositivo>();
        data.forEach(dispo => {
          if (!tiposUnicosMap.has(dispo.tipo_dispositivo)) {
            tiposUnicosMap.set(dispo.tipo_dispositivo, dispo);
          }
        });

        this.listadeDispos = Array.from(tiposUnicosMap.values());
        });

  }


  aceptar(){
  if(this.form.valid){
    this.dispoNuevo.id_dispositivo=this.form.value.CodDispo
    this.dispoNuevo.tipo_dispositivo=this.form.value.Tipodis
    this.dispoNuevo.ubicacion_dispositivo=this.form.value.Ubica
    this.dispoNuevo.estado_dispositivo=this.form.value.Estado
    this.dispoNuevo.id_inmueble.id_inmueble = this.form.value.idInmuebleDISPO;

     if(this.edicion){
        this.dispS.update(this.dispoNuevo).subscribe(data=>{
           this.dispS.list().subscribe(data=>{
             this.dispS.setList(data)})
               this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.dispS.insert(this.dispoNuevo).subscribe(data=>{
            this.dispS.list().subscribe(data=>{
              this.dispS.setList(data)})
                this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['dispositivos'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.dispS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodDispo:new FormControl(data.id_dispositivo), //solo de muestra
            Tipodis:new FormControl(data.tipo_dispositivo),
            Ubica:new FormControl(data.ubicacion_dispositivo),
            Estado:new FormControl(data.estado_dispositivo),
            idInmuebleDISPO:new FormControl(data.id_inmueble.id_inmueble)
        })
      })
    }
  }
}
