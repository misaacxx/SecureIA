import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardispositivoComponent } from "./listardispositivo/listardispositivo.component";

@Component({
  selector: 'app-dispositivo',
  imports: [RouterOutlet, ListardispositivoComponent],
  templateUrl: './dispositivo.component.html',
  styleUrl: './dispositivo.component.css'
})
export class DispositivoComponent {
     constructor(public route:ActivatedRoute){}

}
