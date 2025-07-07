import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InmuebleService } from '../../../services/inmueble.service';

@Component({
  selector: 'app-listarmenor3dispositivos-act',
  imports: [BaseChartDirective],
  templateUrl: './listarmenor3dispositivos-act.component.html',
  styleUrl: './listarmenor3dispositivos-act.component.css'
})
export class Listarmenor3dispositivosActComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
    indexAxis: 'y', // ← esto cambia a horizontal
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='bar'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private inmuS:InmuebleService){}
  
  ngOnInit(): void {
      this.inmuS.getlistarMenor3dispositivosActivos().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.nombre_inmueble)
        this.barChartData=[
          {
            data:data.map(item=>item.cantidad_dispositivos),
            label:'Cantidad de Eventos con Alarma Alta por Tipo Dispositivo',
            backgroundColor:[
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
