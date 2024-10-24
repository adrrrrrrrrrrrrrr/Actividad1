import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './servicios/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); // Verifica si el usuario está autenticado
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
    }
    return isLoggedIn; // Devuelve true si está autenticado, de lo contrario false
  }
}
