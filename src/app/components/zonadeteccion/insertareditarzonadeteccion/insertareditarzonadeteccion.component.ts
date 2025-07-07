import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Zonadeteccion } from '../../../models/zonadeteccion';
import { Inmueble } from '../../../models/inmueble';
import { ZonadeteccionService } from '../../../services/zonadeteccion.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { InmuebleService } from '../../../services/inmueble.service';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarzonadeteccion',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatRadioButton,MatRadioModule,MatIconModule,RouterLink],
  templateUrl: './insertareditarzonadeteccion.component.html',
  styleUrl: './insertareditarzonadeteccion.component.css'
})
export class InsertareditarzonadeteccionComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //


  form: FormGroup=new FormGroup({})
  zonadetecNueva:Zonadeteccion=new Zonadeteccion()
  listadeInmuebles:Inmueble[]=[] //para la lista A SELECCIONAR FK


  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private zonS:ZonadeteccionService,
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
        CodZon:[''], //solo de muestra
        Nombrezon:['',[Validators.required, Validators.maxLength(20),Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]],
        Coord:['',    [ Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?\\s*,\\s*-?\\d+(\\.\\d+)?$')]],
        Monit:['',Validators.required],
        idInmuebleZONA:['',Validators.required]
      })

      this.inmS.list().subscribe(data=>{
        this.listadeInmuebles=data //carga la lista de inmuebles
      })

  }


  aceptar(){
  if(this.form.valid){
    this.zonadetecNueva.id_zona=this.form.value.CodZon
    this.zonadetecNueva.nombre_zona=this.form.value.Nombrezon
    this.zonadetecNueva.coordenada_zona=this.form.value.Coord
    this.zonadetecNueva.monitoreoActivo_zona=this.form.value.Monit
    this.zonadetecNueva.id_inmueble.id_inmueble = this.form.value.idInmuebleZONA;

     if(this.edicion){
        this.zonS.update(this.zonadetecNueva).subscribe(data=>{
           this.zonS.list().subscribe(data=>{
             this.zonS.setList(data)})
                 this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.zonS.insert(this.zonadetecNueva).subscribe(data=>{
            this.zonS.list().subscribe(data=>{
              this.zonS.setList(data)})
                this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['zonasdetec'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.zonS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodZon:new FormControl(data.id_zona), //solo de muestra
            Nombrezon:new FormControl(data.nombre_zona),
            Coord:new FormControl(data.coordenada_zona),
            Monit:new FormControl(data.monitoreoActivo_zona),
            idInmuebleZONA:new FormControl(data.id_inmueble.id_inmueble)
        })
      })
    }
  }
}
