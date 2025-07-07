import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarzonadeteccionComponent } from "./listarzonadeteccion/listarzonadeteccion.component";

@Component({
  selector: 'app-zonadeteccion',
  imports: [RouterOutlet, ListarzonadeteccionComponent],
  templateUrl: './zonadeteccion.component.html',
  styleUrl: './zonadeteccion.component.css'
})
export class ZonadeteccionComponent {
     constructor(public route:ActivatedRoute){}


}
