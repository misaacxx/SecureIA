import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EventodispositivoService } from '../../../services/eventodispositivo.service';
import { BaseChartDirective } from 'ng2-charts';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cantidadeventosxidinmueble',
  imports: [BaseChartDirective, MatFormFieldModule,ReactiveFormsModule,CommonModule,MatInputModule,
    MatIconModule
  ],
  templateUrl: './cantidadeventosxidinmueble.component.html',
  styleUrl: './cantidadeventosxidinmueble.component.css'
})
export class CantidadeventosxidinmuebleComponent implements OnInit {

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

    constructor(private eventS:EventodispositivoService,private fb:FormBuilder){     
      this.form=fb.group({
        IngresoTecla:['']
      })
    }

    ngOnInit(): void {
      this.form.get('IngresoTecla')?.valueChanges.subscribe(value => {
        this.tipoBusqueda = value;

        if (this.tipoBusqueda !== null ) {
          this.eventS.getCantEventxIdInmueble(this.tipoBusqueda).subscribe(data => {
            if (data.length === 0) {
              this.notResults = true;
              this.barChartLabels = [];
              this.barChartData = [];
            } else {
              this.notResults = false;
              this.barChartLabels = data.map(item => item.nombre_Inmueble);
              this.barChartData = [
                {
                  data: data.map(item => item.cantidad_Eventos),
                  label: 'Cantidad de Eventos por Id Inmueble',
                  backgroundColor: ['#2d4cbd'],
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
