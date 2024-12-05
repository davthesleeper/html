import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  searchQuery: string = ''; // Campo para buscar una ubicación
  map: L.Map | null = null;
  userMarker: L.Marker | null = null;
  suggestions: any[] = []; // Sugerencias de direcciones
  isSearchVisible: boolean = true; // Controla la visibilidad del buscador

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeMap();
  }

  // Inicializa el mapa
  initializeMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13); // Coordenadas iniciales
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Manejo de clic en el mapa para geocodificación inversa
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.handleMapClick(e.latlng.lat, e.latlng.lng);
      this.suggestions = []; // Ocultar sugerencias al hacer clic en el mapa
    });
  }

  // Maneja cambios en el campo de búsqueda
  async searchChange() {
    if (!this.searchQuery.trim()) {
      this.suggestions = [];
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=5`;
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MyApp (myemail@example.com)', // Agrega un User-Agent válido
        },
      });
      const data = await response.json();
      this.suggestions = data.length > 0 ? data : [];
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
      this.suggestions = [];
    }
  }

  // Selecciona una dirección de las sugerencias
  selectSuggestion(suggestion: any) {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);

    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }

    // Centra el mapa en la ubicación seleccionada y agrega marcador
    this.map.setView([lat, lon], 15);
    this.addMarker(lat, lon);

    // Limpia las sugerencias pero mantiene el texto en el campo de búsqueda
    this.suggestions = [];
  }

  // Agrega un marcador al mapa
  addMarker(lat: number, lng: number) {
    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }

    // Elimina el marcador anterior si existe
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    // Crea un nuevo marcador
    this.userMarker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
    this.userMarker.bindPopup(`<b>Latitud:</b> ${lat}, <b>Longitud:</b> ${lng}`).openPopup();

    // Al hacer clic en el marcador, da la opción de evaluar
    this.userMarker.on('click', () => {
      this.promptEvaluation(lat, lng);
    });

    // Manejo del arrastre del marcador
    this.userMarker.on('dragend', () => {
      const position = this.userMarker?.getLatLng();
      if (position) {
        this.userMarker?.setPopupContent(`<b>Latitud:</b> ${position.lat}, <b>Longitud:</b> ${position.lng}`).openPopup();
      }
    });
  }

  // Muestra una confirmación para evaluar
  promptEvaluation(lat: number, lng: number) {
    const confirmEvaluation = confirm('¿Deseas agregar una evaluación en esta ubicación?');
    if (confirmEvaluation) {
      this.router.navigate(['/add-place'], {
        queryParams: { lat, lng },
      });
    }
  }

  // Maneja el clic en el mapa para geocodificación inversa
  async handleMapClick(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MyApp (myemail@example.com)', // Agrega un User-Agent válido
        },
      });
      const data = await response.json();
      const address = data.display_name || 'Ubicación desconocida';

      // Agrega un marcador en la ubicación clicada
      this.addMarker(lat, lng);

      // Muestra un popup con la dirección
      L.popup()
        .setLatLng([lat, lng])
        .setContent(`<b>${address}</b><br>Latitud: ${lat}, Longitud: ${lng}`)
        .openOn(this.map!);
    } catch (error) {
      console.error('Error al realizar geocodificación inversa:', error);
    }
  }

  // Alterna la visibilidad del buscador
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
}
