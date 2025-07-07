import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule,RouterLink,MatButtonModule,MatIconModule,MatPaginatorModule,
    CommonModule,MatSortModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})

export class ListarrolComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  cantidadRegistros: number = 0; //pr mostrar cant de registros*
  displayedColumns: string[] = ['c1', 'c2','c3','c4'];
  dataSource: MatTableDataSource<Rol>=new MatTableDataSource();
  constructor(private rS:RolService){}

     //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 


    ngOnInit(): void {
      this.rS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort        
            this.cantidadRegistros = data.length; //cant de registros*
      })
      
      //para el eliminar
      this.rS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*
            this.openSnackBar('Eliminado con éxito', 'Cerrar');

      })
    }

    //agregado para el paginator 
    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

  
  eliminar(id:number){
    this.rS.deleteA(id).subscribe(data=>{
      this.rS.list().subscribe(data=> this.rS.setList(data))

    })
  }

}
