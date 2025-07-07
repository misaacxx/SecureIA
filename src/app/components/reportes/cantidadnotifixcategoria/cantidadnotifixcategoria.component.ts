import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InmuebleService } from '../../../services/inmueble.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';
import { MatSelectModule } from '@angular/material/select';
import { EventoDispositivo } from '../../../models/eventodispositivo';

@Component({
  selector: 'app-cantidadnotifixcategoria',
  imports: [BaseChartDirective, MatFormFieldModule,ReactiveFormsModule,
    CommonModule,MatInputModule,MatSelectModule],
  templateUrl: './cantidadnotifixcategoria.component.html',
  styleUrl: './cantidadnotifixcategoria.component.css'
})
export class CantidadnotifixcategoriaComponent implements OnInit{

    listadeNotificaciones:Notificacion[]=[] //para la muestra de notis

    //para la busqueda de FILTRO 
    form:FormGroup;
    notResults:boolean=false
    tipoBusqueda:string="" //pide ingresar un string

    barChartOptions:ChartOptions={
      responsive:true,
    }
    barChartLabels:string[]=[]
    barChartType:ChartType='bar'
    barChartLegend=true
    barChartData:ChartDataset[]=[]

    constructor(private notiS:NotificacionService,private fb:FormBuilder){     
      this.form=fb.group({
        IngresoTecla:['']
      })
    }

    ngOnInit(): void {

      ///para la eleccion de tipos de Categoria, sin repetidas
      this.notiS.list().subscribe(data => {
        const tiposUnicosMap = new Map<string, Notificacion>();
        data.forEach(tip => {
          if (!tiposUnicosMap.has(tip.categoria_notificacion)) {
            tiposUnicosMap.set(tip.categoria_notificacion, tip);
          }
        });

        this.listadeNotificaciones = Array.from(tiposUnicosMap.values());
      });

      ///manejo del gráfico
      this.form.get('IngresoTecla')?.valueChanges.subscribe(value => {
        this.tipoBusqueda = value;

        if (this.tipoBusqueda !== null ) {
          this.notiS.getCantidadNotiSegunsuCategoria(this.tipoBusqueda).subscribe(data => {
            if (data.length === 0) {
              this.notResults = true;
              this.barChartLabels = [];
              this.barChartData = [];
            } else {
              this.notResults = false;
              this.barChartLabels = data.map(item => item.nombre_Categoria);
              this.barChartData = [
                {
                  data: data.map(item => item.cantidad_segunCategoría),
                  label: 'Cantidad de Notificaciones segun su Categoría',
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
