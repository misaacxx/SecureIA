import { Component } from '@angular/core';
import { ListargeolocalizacionComponent } from "./listargeolocalizacion/listargeolocalizacion.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-geolocalizacion',
  imports: [RouterOutlet,ListargeolocalizacionComponent],
  templateUrl: './geolocalizacion.component.html',
  styleUrl: './geolocalizacion.component.css'
})
export class GeolocalizacionComponent {
    constructor(public route:ActivatedRoute){}
}
