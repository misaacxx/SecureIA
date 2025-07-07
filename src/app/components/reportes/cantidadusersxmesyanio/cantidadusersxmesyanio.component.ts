import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cantidadusersxmesyanio',
  imports: [BaseChartDirective, MatFormFieldModule,ReactiveFormsModule,CommonModule,MatInputModule,
    MatIconModule],
  templateUrl: './cantidadusersxmesyanio.component.html',
  styleUrl: './cantidadusersxmesyanio.component.css'
})
export class CantidadusersxmesyanioComponent implements OnInit {
  //para la busqueda de FILTRO 
  form: FormGroup;
  notResults: boolean = false;
  tipoBusqueda: number = 0;
  tipoBusqueda2: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private usuS: UsuarioService, private fb: FormBuilder) {
    //  Validaciones 
    this.form = fb.group({
      IngresoTecla: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]],  // Año
      IngresoTecla2: ['', [Validators.required, Validators.min(1), Validators.max(12)]]       // Mes
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.tipoBusqueda = value.IngresoTecla;
      this.tipoBusqueda2 = value.IngresoTecla2;

      if (this.form.valid) {
        this.usuS.getCantUsuariosxMesyAnio(this.tipoBusqueda, this.tipoBusqueda2).subscribe(data => {
          if (data.length === 0) {
            this.notResults = true;
            this.barChartLabels = [];
            this.barChartData = [];
          } else {
            this.notResults = false;
            this.barChartLabels = data.map(item => item.mes.toString());
            this.barChartData = [
              {
                data: data.map(item => item.cantidad_de_usuarios),
                label: `Usuarios en ${this.tipoBusqueda2}/${this.tipoBusqueda}`,
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
