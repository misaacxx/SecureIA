import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaractividadComponent } from "./listaractividad/listaractividad.component";

@Component({
  selector: 'app-actividad',
  imports: [RouterOutlet, ListaractividadComponent],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent {
constructor(public route:ActivatedRoute){}
}
