import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ZonadeteccionService } from '../../../services/zonadeteccion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-zonasconmayorcantreco',
  imports: [BaseChartDirective],
  templateUrl: './zonasconmayorcantreco.component.html',
  styleUrl: './zonasconmayorcantreco.component.css'
})
export class ZonasconmayorcantrecoComponent implements OnInit{
 barChartOptions:ChartOptions={
    responsive:true,
    //indexAxis: 'y', // ← esto cambia a horizontal
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='line'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private zonaS:ZonadeteccionService){}
  
  ngOnInit(): void {
      this.zonaS.getListarZonasconMayorCantRecono().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.nombre_Zona)
        this.barChartData=[
          {
            data:data.map(item=>item.cantidad_Reconocimientos),
            label:'Cantidad de Zonas con Mayor Cantidad de Reconocimientos',
            backgroundColor:[
              '',
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
