import { Component,inject,OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms'; //para que acepte el formGroup
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-insertareditarrol',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar 
  imports: [MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,ReactiveFormsModule,
    RouterLink, MatButtonModule,MatIconModule],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarrolComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form:FormGroup=new FormGroup({});

  rol:Rol=new Rol();

  id:number=0
  edicion:boolean=false

    constructor(
      private formBuilder:FormBuilder,
      private rS:RolService, 
      private router:Router, 
      private route:ActivatedRoute 
    ){} 


    ngOnInit(): void {
       this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })


      this.form=this.formBuilder.group({
        Codigo:[''],
        Tipo_de_Rol:['',[Validators.required, Validators.maxLength(15), // maximo 15 
        Validators.pattern(/^[A-Za-z ]+$/) ]]// letras y espacios
      })      
    }

   aceptar(){
    if (this.form.valid){
      this.rol.id_rol=this.form.value.Codigo
      this.rol.tipo_rol=this.form.value.Tipo_de_Rol
      
      //para modificar
      if(this.edicion){
        this.rS.update(this.rol).subscribe(data=>{
           this.rS.list().subscribe(data=>{
             this.rS.setList(data)
             this.openSnackBar('Se actualizó con éxito', 'Aceptar');             
        })
      })
      } else{
      //para insertar
         this.rS.insert(this.rol).subscribe(()=>{
           this.rS.list().subscribe(data=>{
            this.rS.setList(data)
              this.openSnackBar('Registrado con éxito', 'Cerrar');
          })
        })
      }

    this.router.navigate(['roles'])//  nombre de ruta
    }
  }

   // listID
  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
           Codigo: new FormControl(data.id_rol),
           Tipo_de_Rol:new FormControl(data.tipo_rol)
        })
      })
    }
  }


}
