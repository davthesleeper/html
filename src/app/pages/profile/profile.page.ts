import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userEmail: string = '';
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Suscríbete al estado de autenticación para obtener el usuario
    this.authService.isLoggedIn().subscribe(user => {
      if (user) {
        this.userEmail = user.email || ''; // Asigna el correo electrónico
        this.userName = user.displayName || 'Usuario'; // Asigna el nombre
      } else {
        console.log('No hay usuario autenticado');
        this.router.navigate(['/login']); // Redirige al login si no está autenticado
      }
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // Redirige al login
    } catch (error: any) {
      alert('Error al cerrar sesión: ' + (error.message || 'Error desconocido'));
    }
  }
}
