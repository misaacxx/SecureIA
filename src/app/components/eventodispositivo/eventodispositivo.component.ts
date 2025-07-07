import { Component } from '@angular/core';
import { ListareventodispositivoComponent } from "./listareventodispositivo/listareventodispositivo.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eventodispositivo',
  imports: [RouterOutlet,ListareventodispositivoComponent],
  templateUrl: './eventodispositivo.component.html',
  styleUrl: './eventodispositivo.component.css'
})
export class EventodispositivoComponent {
     constructor(public route:ActivatedRoute){}


}
