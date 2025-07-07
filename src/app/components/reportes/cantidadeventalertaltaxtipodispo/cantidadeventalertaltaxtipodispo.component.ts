import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EventodispositivoService } from '../../../services/eventodispositivo.service';

@Component({
  selector: 'app-cantidadeventalertaltaxtipodispo',
  imports: [BaseChartDirective],
  templateUrl: './cantidadeventalertaltaxtipodispo.component.html',
  styleUrl: './cantidadeventalertaltaxtipodispo.component.css'
})
export class CantidadeventalertaltaxtipodispoComponent implements OnInit {
  barChartOptions:ChartOptions={
    responsive:true,
    indexAxis: 'y', // ← esto cambia a horizontal
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='bar'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private eventS:EventodispositivoService){}
  
  ngOnInit(): void {
      this.eventS.getCantEventAlertxTDispo().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.tipoDispositivo)
        this.barChartData=[
          {
            data:data.map(item=>item.cantidadEventosAlertaAlta),
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
