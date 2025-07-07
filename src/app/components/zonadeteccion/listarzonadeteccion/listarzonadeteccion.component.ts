import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Zonadeteccion } from '../../../models/zonadeteccion';
import { ZonadeteccionService } from '../../../services/zonadeteccion.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarzonadeteccion',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule,MatCardModule,CommonModule],
  templateUrl: './listarzonadeteccion.component.html',
  styleUrl: './listarzonadeteccion.component.css'
})

export class ListarzonadeteccionComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

 displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','cMapa','c6','c7']; 
 dataSource: MatTableDataSource<Zonadeteccion>=new MatTableDataSource();
 cantidadRegistros: number = 0; //pr mostrar cant de registros*
 
  // para usar en elAPI
  idMapaVisible: number | null = null;//map
  urlMapa: SafeResourceUrl = ''; //map
  coordInvalid: Set<number> = new Set();//extrasmsMAP
  actMonit:Set<number> = new Set();//extrasmsMAP
  monitoringId: number | null = null; //para el monitoreo
  monitoringInterval: any = null;//monitSimulado

  
  constructor(private zonS:ZonadeteccionService,
    private sanitizer: DomSanitizer//para la consultaAPI
  ){}
         
    //funcionAPI MONITOREO
  verEnMapa(coord: string, id: number): void {
    const partes = coord.split(',');
    const lat = parseFloat(partes[0]);
    const lon = parseFloat(partes[1]);
    const zona = this.dataSource.data.find(z => z.id_zona === id);

    const esMapaVisible = this.idMapaVisible === id;

    // Si se vuelve a hacer clic sobre el mismo ID, cerrar todo y borrar errores
    if (esMapaVisible) {
      this.idMapaVisible = null;
      this.coordInvalid.delete(id);
      this.actMonit.delete(id);
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      this.monitoringId = null;
      return;
    }

    // Elimina errores anteriores
    this.coordInvalid.delete(id);
    this.actMonit.delete(id);

    // Verificar errores nuevos
    if (!zona || zona.monitoreoActivo_zona !== true) {
      this.actMonit.add(id);
      return;
    }

    if (isNaN(lat) || isNaN(lon)) {
      this.coordInvalid.add(id);
      return;
    }

    // Si todo OK: mostrar el mapa y comenzar el monitoreo simulado
    const url = `https://maps.google.com/maps?q=${lat},${lon}&t=k&z=18&output=embed`; //satelite

    this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.idMapaVisible = id;

    // Simulación de monitoreo
    let simulLat = lat;
    let simulLon = lon;
    const updateMapa = () => {
      simulLat += (Math.random() - 0.5) * 0.0005;
      simulLon += (Math.random() - 0.5) * 0.0005;
      const newUrl = `https://maps.google.com/maps?q=${simulLat},${simulLon}&z=16&output=embed`;
      this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    };

    updateMapa();

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    this.monitoringInterval = setInterval(() => {
      if (this.idMapaVisible === id) {
        updateMapa();
      }
    }, 5000);
  }


    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.zonS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
            this.cantidadRegistros = data.length; //cant de registros*    
          })

      this.zonS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.zonS.delete(id).subscribe(data=>{
      this.zonS.list().subscribe(data=> this.zonS.setList(data))
        this.openSnackBar('Eliminado con éxito', 'Aceptar');

    })
  }
}
