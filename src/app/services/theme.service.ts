import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'midnight'; // Establece el tema intermedio como predeterminado

  // Cambiar tema (claro, oscuro, intermedio)
  setTheme(theme: string): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Cambiar color principal
  setColor(color: string): void {
    document.body.style.setProperty('--ion-color-primary', color);
    document.body.style.setProperty('--ion-color-primary-shade', this.shadeColor(color, -0.1));
    document.body.style.setProperty('--ion-color-primary-tint', this.shadeColor(color, 0.1));
  }

  // Obtener el tema actual
  getTheme(): string {
    return this.currentTheme;
  }

  // Ajuste de tonos
  private shadeColor(color: string, percent: number): string {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }
}
