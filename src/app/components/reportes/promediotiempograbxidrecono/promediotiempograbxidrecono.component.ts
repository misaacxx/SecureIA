import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { GrabacionService } from '../../../services/grabacion.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-promediotiempograbxidrecono',
  imports: [BaseChartDirective, MatFormFieldModule,ReactiveFormsModule,CommonModule,
    MatIconModule,MatInputModule],
  templateUrl: './promediotiempograbxidrecono.component.html',
  styleUrl: './promediotiempograbxidrecono.component.css'
})
export class PromediotiempograbxidreconoComponent implements OnInit{
    //para la busqueda de FILTRO 
    form:FormGroup;
    notResults:boolean=false
    tipoBusqueda:number=0

    barChartOptions:ChartOptions={
      responsive:true,
    }
    barChartLabels:string[]=[]
    barChartType:ChartType='doughnut'
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
          this.grabS.getPromedioGrabxIDReco(this.tipoBusqueda).subscribe(data => {
            if (data.length === 0) {
              this.notResults = true;
              this.barChartLabels = [];
              this.barChartData = [];
            } else {
              this.notResults = false;
              this.barChartLabels = data.map(item => item.id_reco.toString());
              this.barChartData = [
                {
                  data: data.map(item => item.duracion_promedio),
                  label: 'Duración Promedio del Tiempo de Grabación',
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
