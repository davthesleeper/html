import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  selectedTheme: 'light' | 'dark' | 'midnight' = 'light';

  constructor(private themeService: ThemeService) {}

  // Cambiar tema
  applyTheme() {
    this.themeService.setTheme(this.selectedTheme);
  }

  ngOnInit() {
    this.selectedTheme = this.themeService.getTheme() as 'light' | 'dark' | 'midnight';
  }
}
