import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [RouterLink,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
   role:string=''
  constructor(private loginService: LoginService) {}

  verificar() {
  this.role = this.loginService.showRole();
  return this.loginService.verificar();
  }

  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }

}
