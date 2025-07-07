import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Grabacion } from '../../../models/grabacion';
import { GrabacionService } from '../../../services/grabacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listargrabacion',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule],
  templateUrl: './listargrabacion.component.html',
  styleUrl: './listargrabacion.component.css'
})
export class ListargrabacionComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 cantidadRegistros: number = 0; //pr mostrar cant de registros*
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7']; 
 dataSource: MatTableDataSource<Grabacion>=new MatTableDataSource();
  
  constructor(private grabS:GrabacionService ){}
         
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.grabS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*
          })

      this.grabS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    
    eliminar(id:number){
    this.grabS.delete(id).subscribe(data=>{
      this.grabS.list().subscribe(data=> this.grabS.setList(data))
           this.openSnackBar('Eliminado con éxito', 'Aceptar');
    })
  }
}
