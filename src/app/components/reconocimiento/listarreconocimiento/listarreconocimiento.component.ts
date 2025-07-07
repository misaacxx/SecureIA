import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Reconocimiento } from '../../../models/reconocimiento';
import { ReconocimientoService } from '../../../services/reconocimiento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import {  MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listarreconocimiento',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule,
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,CommonModule,//imports para el form reactivo
    MatTooltipModule], 
  templateUrl: './listarreconocimiento.component.html',
  styleUrl: './listarreconocimiento.component.css'
})
export class ListarreconocimientoComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 cantidadRegistros: number = 0; //pr mostrar cant de registros*
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7']; 
 dataSource: MatTableDataSource<Reconocimiento>=new MatTableDataSource();
  
 //para la busqueda de FILTRO 
  form:FormGroup;
  notResults:boolean=false
  tipoBusqueda:string=""


  //busqueda -> solo fb añadido y se inicializa el form
  constructor(private recoS:ReconocimientoService, private fb:FormBuilder,
    private loginService: LoginService ){
      this.form=fb.group({
      tipoA:['']
     })
  }
         
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.recoS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
             this.cantidadRegistros = data.length; //cant de registros*
          })

      //busqueda
      this.form.get('tipoA')?.valueChanges.subscribe(value=>{
        this.tipoBusqueda=value
        this.buscar()
      })
    
      this.recoS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //paginator
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
             this.cantidadRegistros = data.length; //cant de registros*
      })
    }
  
    //agregado para el paginator 
    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
    
    //eliminar
    eliminar(id:number){
    this.recoS.delete(id).subscribe(data=>{
      this.recoS.list().subscribe(data=> this.recoS.setList(data))
         this.openSnackBar('Eliminado con éxito', 'Aceptar');

    })
  }

  
  //MÉTODO BUSCAR
    buscar(){
      if(this.tipoBusqueda!=null){
          this.recoS.SearchRecoxTipoEvento(this.tipoBusqueda).subscribe(data=>{
             this.dataSource=new MatTableDataSource(data)
              //agregado para el paginator 
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort //  
              
             this.notResults=data.length===0
          })
          
      }else{
        this.recoS.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data)
          //agregado para el paginator 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort //

          this.notResults=false
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
