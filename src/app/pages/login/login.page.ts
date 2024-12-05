import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/profile']); // Redirige al perfil
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado. Por favor regístrate.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Inténtalo nuevamente.');
      } else {
        alert(`Error: ${error.message || 'Ocurrió un problema inesperado.'}`);
      }
    }
  }
}
