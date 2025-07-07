import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ZonadeteccionService } from '../../../services/zonadeteccion.service';

@Component({
  selector: 'app-cantzonasmonitoactixidinmueble',
  imports: [BaseChartDirective],
  templateUrl: './cantzonasmonitoactixidinmueble.component.html',
  styleUrl: './cantzonasmonitoactixidinmueble.component.css'
})
export class CantzonasmonitoactixidinmuebleComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
    indexAxis: 'y', // ← esto cambia a horizontal
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='bar'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private zonaS:ZonadeteccionService){}
  
  ngOnInit(): void {
      this.zonaS.getCantZonasMonitoActivasxInmueble().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.nombre_inmueble)
        this.barChartData=[
          {
            data:data.map(item=>item.cantidad_Zonas_Monitoriadas),
            label:'Cantidad de Zonas Monitoreadas Activas por Id Inmueble',
            backgroundColor:[
              '#2d4cbd',
              '#2d4cbd',
              '#2d4cbd',
              '#2d4cbd',
              '#2d4cbd', 
              '#2d4cbd', 
              '#2d4cbd'  
            ],
            borderColor:'#00008B',
            borderWidth:1
          }
          
        ]
      })
  }
}
