import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth, private themeService: ThemeService) {
    this.initializeApp();
  }

  // Método para inicializar la app
  initializeApp() {
    this.setDefaultTheme();
    this.testFirebase();
  }

  // Configurar el tema predeterminado
  private setDefaultTheme(): void {
    this.themeService.setTheme('midnight'); // Establece el tema intermedio como predeterminado
  }

  // Probar conexión con Firebase
  private async testFirebase(): Promise<void> {
    try {
      const user = await this.afAuth.signInAnonymously();
      console.log('Firebase connected, user:', user);
    } catch (error) {
      console.error('Firebase connection error:', error);
    }
  }
}
