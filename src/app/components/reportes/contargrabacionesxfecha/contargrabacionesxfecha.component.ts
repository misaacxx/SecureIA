import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GrabacionService } from '../../../services/grabacion.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contargrabacionesxfecha',
  imports: [BaseChartDirective, MatFormFieldModule,ReactiveFormsModule,CommonModule,MatInputModule,
    MatDatepickerModule,MatNativeDateModule,FormsModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  templateUrl: './contargrabacionesxfecha.component.html',
  styleUrl: './contargrabacionesxfecha.component.css'
})
export class ContargrabacionesxfechaComponent implements OnInit {

   //para la busqueda de FILTRO 
  form:FormGroup;
  notResults:boolean=false
  tipoBusqueda:Date=new Date()

  barChartOptions:ChartOptions={
    responsive:true,

  }

  barChartLabels:string[]=[]
  barChartType:ChartType='pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private grabS:GrabacionService,private fb:FormBuilder){     
     this.form=fb.group({
      IngresoTecla:['']
     })
  }

  ngOnInit(): void {
    this.form.get('IngresoTecla')?.valueChanges.subscribe(value => {
      this.tipoBusqueda = value;

      if (this.tipoBusqueda !== null ) {
        this.grabS.getContarGrabaxFecha(this.tipoBusqueda).subscribe(data => {
            
         const total = data.reduce((acc, item) => acc + item.cantidad, 0); 
         // sumamos todas las cantidades
         //array siempre es >=1 su valor dentro interviene cantidad=0

        if (total === 0) {
            this.notResults = true;
            this.barChartLabels = [];
            this.barChartData = [];
          } else {
            this.notResults = false;
            this.barChartLabels = data.map(item => item.cantidad.toString());
            this.barChartData = [
              {
                data: data.map(item => item.cantidad),
                label: 'Contar Grabaciones por Fecha',
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
