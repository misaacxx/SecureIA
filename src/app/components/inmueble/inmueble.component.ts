import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarinmuebleComponent } from './listarinmueble/listarinmueble.component';

@Component({
  selector: 'app-inmueble',
  imports: [RouterOutlet,ListarinmuebleComponent],
  templateUrl: './inmueble.component.html',
  styleUrl: './inmueble.component.css'
})
export class InmuebleComponent {
   constructor(public route:ActivatedRoute){}
}
