import { Component } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-noautorizado',
  imports: [],
  templateUrl: './noautorizado.component.html',
  styleUrl: './noautorizado.component.css'
})
export class NoautorizadoComponent {
  constructor(private router:Router) {}

  goHome() {
      this.router.navigate(['inicio'])
  }
}
