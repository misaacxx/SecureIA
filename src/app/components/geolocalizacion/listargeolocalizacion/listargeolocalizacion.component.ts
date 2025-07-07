import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { Geolocalizacion } from '../../../models/geolocalizacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-listargeolocalizacion',
  standalone:true,
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule,MatCardModule,CommonModule,
    ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatTooltipModule],
  templateUrl: './listargeolocalizacion.component.html',
  styleUrl: './listargeolocalizacion.component.css'
})
export class ListargeolocalizacionComponent implements OnInit,AfterViewInit{

  //snackbar//
  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  dataSource: Geolocalizacion[] = [];
  pagedData: Geolocalizacion[] = [];
  totalLength: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  form: FormGroup;
  form2: FormGroup;
  notResults1: boolean = false;
  notResults2: boolean = false;
  idinmuebleaBuscar: number = 0;
  idzonaaBuscar: number = 0;

  constructor(
    private geoS: GeolocalizacionService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.form = fb.group({
      idInmueble: ['', Validators.pattern('^[0-9]*$')]
    });

    this.form2 = fb.group({
      idZona: ['', Validators.pattern('^[0-9]*$')]
    });
  }

  ngOnInit(): void {
    this.geoS.list().subscribe(data => {
      this.dataSource = data;
      this.totalLength = data.length;
      setTimeout(() => {
        this.paginator.firstPage();
        this.updatePagedData();
      });
    });

    this.geoS.getList().subscribe(data => {
      this.dataSource = data;
      this.totalLength = data.length;
      setTimeout(() => {
        this.paginator.firstPage();
        this.updatePagedData();
      });
    });

    this.form.get('idInmueble')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.idinmuebleaBuscar = value;
        this.buscar();
      });

    this.form2.get('idZona')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.idzonaaBuscar = value;
        this.buscar();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.page.subscribe(() => {
          this.updatePagedData();
        });
      }
    });
  }

updatePagedData(): void {
  if (!this.paginator) return;
  const pageIndex = this.paginator.pageIndex;
  const pageSize = this.paginator.pageSize;
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  this.pagedData = this.dataSource.slice(startIndex, endIndex);
}


  buscar(): void {
    if (this.idinmuebleaBuscar != 0) {
      this.geoS.SearchGeoxIdInmu(this.idinmuebleaBuscar).subscribe(data => {
        this.dataSource = data;
        this.totalLength = data.length;
        this.notResults1 = data.length === 0;

        setTimeout(() => {
          this.paginator.firstPage();
          this.updatePagedData();
        });
      });
    } else if (this.idzonaaBuscar != 0) {
      this.geoS.SearchGeoxIdZona(this.idzonaaBuscar).subscribe(data => {
        this.dataSource = data;
        this.totalLength = data.length;
        this.notResults2 = data.length === 0;

        setTimeout(() => {
          this.paginator.firstPage();
          this.updatePagedData();
        });
      });
    } else {
      this.geoS.list().subscribe(data => {
        this.dataSource = data;
        this.totalLength = data.length;
        this.notResults1 = false;
        this.notResults2 = false;

        setTimeout(() => {
          this.paginator.firstPage();
          this.updatePagedData();
        });
      });
    }
  }

  //USO DE API GEOLOCALIZACIÓN
  getMapaUrl(lat: number, lon: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  eliminar(id: number): void {
    this.geoS.delete(id).subscribe(() => {
      this.geoS.list().subscribe(data => {
        this.dataSource = data;
        this.totalLength = data.length;
        this.updatePagedData();
      });
     this.openSnackBar('Eliminado con éxito', 'Aceptar');

    });
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