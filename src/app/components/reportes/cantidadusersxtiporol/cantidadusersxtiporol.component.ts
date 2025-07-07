import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-cantidadusersxtiporol',
  imports: [BaseChartDirective],
  templateUrl: './cantidadusersxtiporol.component.html',
  styleUrl: './cantidadusersxtiporol.component.css'
})
export class CantidadusersxtiporolComponent implements OnInit {
  barChartOptions:ChartOptions={
    responsive:true,
    indexAxis: 'y', // ← esto cambia a horizontal
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='bar'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private rolS:RolService){}
  
  ngOnInit(): void {
      this.rolS.getCantidadUsersxTypeRol().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.tipoRol)
        this.barChartData=[
          {
            data:data.map(item=>item.cantidad_de_Usuarios),
            label:'Cantidad de Usuarios con ROL ingresado:',
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
