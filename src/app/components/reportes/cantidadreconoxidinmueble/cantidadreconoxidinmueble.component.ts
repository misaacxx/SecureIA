import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReconocimientoService } from '../../../services/reconocimiento.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cantidadreconoxidinmueble',
  imports: [BaseChartDirective, MatFormFieldModule,
    ReactiveFormsModule, CommonModule, MatInputModule,MatIconModule],
  templateUrl: './cantidadreconoxidinmueble.component.html',
  styleUrl: './cantidadreconoxidinmueble.component.css'
})
export class CantidadreconoxidinmuebleComponent {
   //para la busqueda de FILTRO 
    form:FormGroup;
    notResults:boolean=false
    tipoBusqueda:number=0

    barChartOptions:ChartOptions={
      responsive:true,
    }
    barChartLabels:string[]=[]
    barChartType:ChartType='bar'
    barChartLegend=true
    barChartData:ChartDataset[]=[]

    constructor(private recoS:ReconocimientoService,private fb:FormBuilder){     
      this.form=fb.group({
        IngresoTecla:['']
      })
    }

    ngOnInit(): void {
      this.form.get('IngresoTecla')?.valueChanges.subscribe(value => {
        this.tipoBusqueda = value;

        if (this.tipoBusqueda !== null ) {
          this.recoS.getCantRecoxIdInmueble(this.tipoBusqueda).subscribe(data => {
            if (data.length === 0) {
              this.notResults = true;
              this.barChartLabels = [];
              this.barChartData = [];
            } else {
              this.notResults = false;
              this.barChartLabels = data.map(item =>`${item.nombre_inmueble} con ID: (${item.id_inmueble})`);
              this.barChartData = [
                {
                  data: data.map(item => item.cantidad_reconocimientos),
                  label: 'Cantidad de Reconocimientos por Id Inmueble',
                  backgroundColor: ['#2d4cbd', '#2d4cbd', '#2d4cbd', '#2d4cbd'],
                  borderColor: '#00008B',
                  borderWidth: 1
                }
              ];
            }
          });
        }
      });
    }

}
