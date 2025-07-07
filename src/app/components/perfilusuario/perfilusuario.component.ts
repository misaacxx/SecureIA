import { Component } from '@angular/core';
import { ListarperfilusuarioComponent } from "./listarperfilusuario/listarperfilusuario.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-perfilusuario',
  imports: [ListarperfilusuarioComponent,RouterOutlet],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent {
     constructor(public route:ActivatedRoute){}

}
