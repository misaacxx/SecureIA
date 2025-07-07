import { Component } from '@angular/core';
import { ListarreconocimientoComponent } from "./listarreconocimiento/listarreconocimiento.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reconocimiento',
  imports: [ListarreconocimientoComponent,RouterOutlet],
  templateUrl: './reconocimiento.component.html',
  styleUrl: './reconocimiento.component.css'
})
export class ReconocimientoComponent {
   constructor(public route:ActivatedRoute){}
}
