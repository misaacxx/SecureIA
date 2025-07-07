import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PerfilusuarioService } from '../../../services/perfilusuario.service';
import { PerfilUsuario } from '../../../models/perfilusuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listarperfilusuario',
  imports: [MatTableModule,RouterLink,MatButtonModule,MatIconModule,MatPaginatorModule,MatSortModule,
    CommonModule, MatTooltipModule
  ],
  templateUrl: './listarperfilusuario.component.html',
  styleUrl: './listarperfilusuario.component.css'
})
export class ListarperfilusuarioComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //
 
  cantidadRegistros: number = 0; //pr mostrar cant de registros*
  displayedColumns: string[] = ['c1', 'c2','c3','c4','c5', 'c6','c7','c8','c9'];
  dataSource: MatTableDataSource<PerfilUsuario>=new MatTableDataSource();

  constructor(private perusuS:PerfilusuarioService,private loginService: LoginService){}

     //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 


    ngOnInit(): void {
      this.perusuS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort    
            this.cantidadRegistros = data.length; //cant de registros*   
             
      })
      
      //para el eliminar
      this.perusuS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.perusuS.deleteA(id).subscribe(data=>{
      this.perusuS.list().subscribe(data=> this.perusuS.setList(data))
        this.openSnackBar('Eliminado con éxito', 'Aceptar');

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
