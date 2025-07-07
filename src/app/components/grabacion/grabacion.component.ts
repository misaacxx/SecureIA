import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListargrabacionComponent } from "./listargrabacion/listargrabacion.component";

@Component({
  selector: 'app-grabacion',
  imports: [RouterOutlet, ListargrabacionComponent],
  templateUrl: './grabacion.component.html',
  styleUrl: './grabacion.component.css'
})
export class GrabacionComponent {
  constructor(public route:ActivatedRoute){}

}
