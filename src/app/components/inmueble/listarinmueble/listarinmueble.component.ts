import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Inmueble } from '../../../models/inmueble';
import { InmuebleService } from '../../../services/inmueble.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //para el lottier
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarinmueble',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule,MatSortModule,
    CommonModule
  ],
  templateUrl: './listarinmueble.component.html',
  styleUrl: './listarinmueble.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListarinmuebleComponent implements OnInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 cantidadRegistros: number = 0; //pr mostrar cant de registros*

 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7'];
 dataSource: MatTableDataSource<Inmueble>=new MatTableDataSource();

  constructor(private iS:InmuebleService,private loginService: LoginService){}

    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.iS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*
          })

      this.iS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.iS.deleteA(id).subscribe(data=>{
      this.iS.list().subscribe(data=> this.iS.setList(data))
        this.openSnackBar('Eliminado con éxito', 'Aceptar')
    })
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
