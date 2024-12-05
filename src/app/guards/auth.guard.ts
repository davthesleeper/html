import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.isLoggedIn().toPromise();
    if (user) {
      return true; // Usuario autenticado
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
  }
}
