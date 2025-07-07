import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarnotificacionComponent } from './listarnotificacion/listarnotificacion.component';

@Component({
  selector: 'app-notificacion',
  imports: [RouterOutlet,ListarnotificacionComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  constructor(public route:ActivatedRoute){}

}
