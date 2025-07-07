import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Reconocimiento } from '../../../models/reconocimiento';
import { EventoDispositivo } from '../../../models/eventodispositivo';
import { ReconocimientoService } from '../../../services/reconocimiento.service';
import { EventodispositivoService } from '../../../services/eventodispositivo.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarreconocimiento',
   providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatIconModule,MatRadioModule,MatCheckboxModule,
    MatDatepickerModule,MatTimepickerModule,
    RouterLink],
  templateUrl: './insertareditarreconocimiento.component.html',
  styleUrl: './insertareditarreconocimiento.component.css'
})
export class InsertareditarreconocimientoComponent implements OnInit{
  
  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  recoNueva:Reconocimiento=new Reconocimiento()
  listaEventosDispositivos:EventoDispositivo[]=[] //para la lista A SELECCIONAR FK

  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private recoS:ReconocimientoService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private eveS:EventodispositivoService, //service del 1ERFK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodRECO:[''], //solo de muestra
        ImgReco:['', [Validators.required, Validators.maxLength(100)]],
        ident: [false],    //por el checkbox
        FechayHora:['',Validators.required],
        idevenRECO:['',Validators.required],
      })

      this.eveS.list().subscribe(data=>{
        this.listaEventosDispositivos=data //carga la lista de usuariosFK
      })

  }


  aceptar(){
  if(this.form.valid){
    this.recoNueva.id_reconocimiento=this.form.value.CodRECO
    this.recoNueva.img_url_reconocimiento=this.form.value.ImgReco
    this.recoNueva.identificado_reconocimiento=this.form.value.ident
    this.recoNueva.fechaHora_reconocimiento = this.form.value.FechayHora
    this.recoNueva.id_evento_dispositivo.id_evento=this.form.value.idevenRECO

     if(this.edicion){
        this.recoS.update(this.recoNueva).subscribe(data=>{
           this.recoS.list().subscribe(data=>{
             this.recoS.setList(data)})
              this.openSnackBar('Se actualizó con éxito', 'Aceptar');

        })
      } else{
        this.recoS.insert(this.recoNueva).subscribe(data=>{
            this.recoS.list().subscribe(data=>{
              this.recoS.setList(data)})
                 this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['reconocimientos'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.recoS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodRECO:new FormControl(data.id_reconocimiento), //solo de muestra
            ImgReco:new FormControl(data.img_url_reconocimiento),
            ident:new FormControl(data.identificado_reconocimiento),
            FechayHora:new FormControl(data.fechaHora_reconocimiento),
            idevenRECO:new FormControl(data.id_evento_dispositivo.id_evento),
        })
      })
    }
  }

}
