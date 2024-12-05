import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    // Validar que el correo y la contraseña estén completos
    if (!this.email.trim() || !this.password.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validar el formato básico del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('El formato del correo electrónico no es válido.');
      return;
    }

    try {
      // Intentar registrar el usuario usando el servicio de autenticación
      await this.authService.register(this.email, this.password);
      alert('¡Registro exitoso!');
      this.router.navigate(['/login']);
    } catch (error: any) {
      // Manejo de errores comunes
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('El correo ya está en uso. Intenta iniciar sesión.');
          break;
        case 'auth/weak-password':
          alert('La contraseña es demasiado débil. Usa al menos 6 caracteres.');
          break;
        case 'auth/invalid-email':
          alert('El correo electrónico ingresado no es válido.');
          break;
        default:
          alert(`Error inesperado: ${error.message || 'Por favor, inténtalo de nuevo más tarde.'}`);
      }
    }
  }
}
