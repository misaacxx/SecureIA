import { Component } from '@angular/core';
import { CantidadeventalertaltaxtipodispoComponent } from './cantidadeventalertaltaxtipodispo/cantidadeventalertaltaxtipodispo.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [CantidadeventalertaltaxtipodispoComponent,RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}
}
