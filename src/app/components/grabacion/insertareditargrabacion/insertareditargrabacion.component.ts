import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Grabacion } from '../../../models/grabacion';
import { Reconocimiento } from '../../../models/reconocimiento';
import { ReconocimientoService } from '../../../services/reconocimiento.service';
import { GrabacionService } from '../../../services/grabacion.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditargrabacion',
   providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,MatIconModule,MatRadioModule,MatCheckboxModule,
    MatDatepickerModule,MatTimepickerModule,
    RouterLink],
  templateUrl: './insertareditargrabacion.component.html',
  styleUrl: './insertareditargrabacion.component.css'
})
export class InsertareditargrabacionComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //


  form: FormGroup=new FormGroup({})
  grabNueva:Grabacion=new Grabacion()
  listadeReconocimientos:Reconocimiento[]=[] //para la lista A SELECCIONAR FK

  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private grabS:GrabacionService,       
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private recoS:ReconocimientoService, //service del 1ERFK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodGRAB:[''], //solo de muestra
        urlGRAB:['', [Validators.required, Validators.maxLength(100)]],
        horaini: ['',Validators.required],  
        duraSeg:['',[Validators.required,  Validators.min(1), Validators.pattern('^[0-9]+$') ]],// mayor a 0] y // solo números enteros
        idgrabRECO:['',Validators.required],
      })

      this.recoS.list().subscribe(data=>{
        this.listadeReconocimientos=data //carga la lista de usuariosFK
      })

  }


  aceptar(){
  if(this.form.valid){
    this.grabNueva.id_grabacion=this.form.value.CodGRAB
    this.grabNueva.url_grabacion=this.form.value.urlGRAB

    //this.grabNueva.horainicio_grabacion=this.form.value.horaini
    // Conversion date->time->string de hora q recibe
    const hora: Date = this.form.value.horaini;
    const horaString = hora.toTimeString().split(' ')[0]; // "14:30:00"
    this.grabNueva.horainicio_grabacion = horaString;//

    this.grabNueva.duracionSeg_grabacion = this.form.value.duraSeg
    this.grabNueva.id_reconocimiento.id_reconocimiento=this.form.value.idgrabRECO

     if(this.edicion){
        this.grabS.update(this.grabNueva).subscribe(data=>{
           this.grabS.list().subscribe(data=>{
             this.grabS.setList(data)})
               this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.grabS.insert(this.grabNueva).subscribe(data=>{
            this.grabS.list().subscribe(data=>{
              this.grabS.setList(data)})
                this.openSnackBar('Registrado con éxito', 'Cerrar');
        })
      } 

      this.router.navigate(['grabaciones'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.grabS.listId(this.id).subscribe(data=>{

      // Convierte string 14:30:00 a un Date con fecha base x)
            const horaString = data.horainicio_grabacion; // formato14:30:00
            const horaParts = horaString.split(':');
            const horaDate = new Date();
            horaDate.setHours(+horaParts[0], +horaParts[1], +horaParts[2]);//

        this.form=new FormGroup({
            CodGRAB:new FormControl(data.id_grabacion), //solo de muestra
            urlGRAB:new FormControl(data.url_grabacion),
            //horaini:new FormControl(data.horainicio_grabacion),
            horaini:new FormControl(horaDate), //nuevo solotime
            duraSeg:new FormControl(data.duracionSeg_grabacion),
            idgrabRECO:new FormControl(data.id_reconocimiento.id_reconocimiento),
        })
      })
    }
  }
}
