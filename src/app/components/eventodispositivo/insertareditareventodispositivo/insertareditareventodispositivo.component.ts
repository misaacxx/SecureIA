import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { EventoDispositivo } from '../../../models/eventodispositivo';
import { EventManager } from '@angular/platform-browser';
import { Dispositivo } from '../../../models/dispositivo';
import { DispositivoService } from '../../../services/dispositivo.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EventodispositivoService } from '../../../services/eventodispositivo.service';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar'; //snackbar button


@Component({
  selector: 'app-insertareditareventodispositivo',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatDatepickerModule,MatTimepickerModule,
    MatRadioButton,MatIconModule,MatRadioModule,
    RouterLink],

  templateUrl: './insertareditareventodispositivo.component.html',
  styleUrl: './insertareditareventodispositivo.component.css'
})
export class InsertareditareventodispositivoComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  evento:EventoDispositivo=new EventoDispositivo()
  listadeDispositivos:Dispositivo[]=[] //para la lista A SELECCIONAR

  listadeEventos:EventoDispositivo[]=[] //para la muestra de tiposdeeventos

  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private evtdiS:EventodispositivoService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private disS:DispositivoService, //service del FK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodiEvent:[''], //solo de muestra
        tipo:['',Validators.required],
        Descrip:['',[Validators.required, Validators.maxLength(250)]],
        FechayHora:['',Validators.required],
        NivelAler:['',Validators.required],
        idDispoEVENT:['',Validators.required]
      })

      this.disS.list().subscribe(data=>{
        this.listadeDispositivos=data //carga la lista de dispositivos
      })


      ///para la eleccion de tipos de Evento, sin repetidas
      this.evtdiS.list().subscribe(data => {
        const tiposUnicosMap = new Map<string, EventoDispositivo>();
        data.forEach(tip => {
          if (!tiposUnicosMap.has(tip.tipo_evento)) {
            tiposUnicosMap.set(tip.tipo_evento, tip);
          }
        });

        this.listadeEventos = Array.from(tiposUnicosMap.values());
        });

  }

  aceptar(){
  if(this.form.valid){
    this.evento.id_evento=this.form.value.CodiEvent
    this.evento.tipo_evento=this.form.value.tipo
    this.evento.descripcion_evento=this.form.value.Descrip

    // Corrige el desfase de zona horaria(+5) DATETIMEPICKER
    const fechaForm: string = this.form.value.FechayHora; // tipo string modo "2025-06-21T01:30"
    const fecha = new Date(fechaForm);
    const fechaAjust = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
    this.evento.fechaHora_evento = fechaAjust;//asignado hora y fecha

    this.evento.nivelAlerta_evento=this.form.value.NivelAler
    this.evento.id_dispositivo.id_dispositivo=this.form.value.idDispoEVENT

     if(this.edicion){
        this.evtdiS.update(this.evento).subscribe(data=>{
           this.evtdiS.list().subscribe(data=>{
             this.evtdiS.setList(data)})
             this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.evtdiS.insert(this.evento).subscribe(data=>{
            this.evtdiS.list().subscribe(data=>{
              this.evtdiS.setList(data)})           
              this.openSnackBar('Registrado con éxito', 'Cerrar');

        })
      } 

      this.router.navigate(['eventos'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.evtdiS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodiEvent:new FormControl(data.id_evento), //solo de muestra
            tipo:new FormControl(data.tipo_evento),
            Descrip:new FormControl(data.descripcion_evento),
            FechayHora:new FormControl(data.fechaHora_evento),
            NivelAler:new FormControl(data.nivelAlerta_evento),
            idDispoEVENT:new FormControl(data.id_dispositivo.id_dispositivo)
        })
      })
    }
  }
}
