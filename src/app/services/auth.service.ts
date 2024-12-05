import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método de inicio de sesión
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuario autenticado');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  }
  

  // Método para registrar un usuario
  async register(email: string, password: string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn() {
    return this.afAuth.authState; // Devuelve un observable
  }

  // Método para cerrar sesión
  async logout() {
    return this.afAuth.signOut();
  }
}
