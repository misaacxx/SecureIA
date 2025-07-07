import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DispositivoService } from '../../../services/dispositivo.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Dispositivo } from '../../../models/dispositivo';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listardispositivo',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule],
  templateUrl: './listardispositivo.component.html',
  styleUrl: './listardispositivo.component.css'
})
export class ListardispositivoComponent implements OnInit{


  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //


 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7']; 
 dataSource: MatTableDataSource<Dispositivo>=new MatTableDataSource();
  cantidadRegistros: number = 0; //pr mostrar cant de registros*
 
  constructor(private dispoS:DispositivoService ){}
         
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.dispoS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*    
          })

      this.dispoS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.dispoS.delete(id).subscribe(data=>{
      this.dispoS.list().subscribe(data=> this.dispoS.setList(data))
        this.openSnackBar('Eliminado con éxito', 'Aceptar');


    })
  }

}
