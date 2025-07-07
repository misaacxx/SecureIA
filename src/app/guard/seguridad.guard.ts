// seguridad.guard.ts
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  const rpta = lService.verificar(); // Verifica si está logueado

  if (!rpta) {
    router.navigate(['/login']);
    return false;
  }

  // ⚠️ Verificación de roles
  //const expectedRoles: string[] = route.data['roles']; // <-- roles permitidos en la ruta
  const expectedRoles: string[] = route.data['roles'] ?? route.parent?.data['roles']; //con hijos

  const userRole = lService.showRole(); // <-- rol actual

  if (expectedRoles && !expectedRoles.includes(userRole)) {
    router.navigate(['/noautorizado']); // Redirige si no tiene permisos
    return false;
  }

  return true; // Tiene acceso
};