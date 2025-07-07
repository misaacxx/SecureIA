import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSort, MatSortModule } from '@angular/material/sort'; //paginator
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; //paginator
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //para el lottier
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule,MatSortModule,
    MatFormFieldModule,ReactiveFormsModule,CommonModule,MatInputModule //añadidos para el FILTRO
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListarusuarioComponent implements OnInit {
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7','c8', 'c9','c10','c11'];
 dataSource: MatTableDataSource<Usuario>=new MatTableDataSource();

 cantidadRegistros: number = 0; //pr mostrar cant de registros*

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 //para la busqueda de FILTRO 
  form:FormGroup;
  notResults:boolean=false
  nombreBusqueda:string=""

  //busqueda -> solo fb añadido y se inicializa el form
  constructor(private uS:UsuarioService,  private fb:FormBuilder){
     this.form=fb.group({
      nombre:['']
     })
  }
    
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.uS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*
          })

      //busqueda
      this.form.get('nombre')?.valueChanges.subscribe(value=>{
        this.nombreBusqueda=value
        this.buscar()
      })

      this.uS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
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
    
  eliminar(id:number){
    this.uS.deleteA(id).subscribe(data=>{
      this.uS.list().subscribe(data=> this.uS.setList(data))
      this.openSnackBar('Eliminado con éxito', 'Aceptar');

    })
  }

  //MÉTODO BUSCAR
    buscar(){
      if(this.nombreBusqueda!=null){
          this.uS.SearchUserxNombre(this.nombreBusqueda).subscribe(data=>{
             this.dataSource=new MatTableDataSource(data)
              //agregado para el paginator 
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort //  
              this.cantidadRegistros = data.length; //cant de registros*
              this.notResults=data.length===0
          })
          
      }else{
        this.uS.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data)
          //agregado para el paginator 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort //
          this.cantidadRegistros = data.length; //cant de registros*
          this.notResults=false
        })
      }
    }

}
