import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ActividadComponent } from '../actividad.component';
import { Actividad } from '../../../models/actividad';
import { ActividadService } from '../../../services/actividad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-listaractividad',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule,MatSortModule,
    CommonModule,MatTooltipModule
  ],
  templateUrl: './listaractividad.component.html',
  styleUrl: './listaractividad.component.css'
})
export class ListaractividadComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 cantidadRegistros: number = 0; //pr mostrar cant de registros*
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7'];
 dataSource: MatTableDataSource<Actividad>=new MatTableDataSource();

  constructor(private aS:ActividadService, private loginService: LoginService){}

    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {

      this.aS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*
          })

      this.aS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.aS.deleteA(id).subscribe(data=>{
      this.aS.list().subscribe(data=> this.aS.setList(data))
        this.openSnackBar('Eliminado con éxito', 'Aceptar');
    })
  }
 

   role:string=''
  //constructor(private loginService: LoginService) {}

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

}
