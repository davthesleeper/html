import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places: { name: string; lat: number; lng: number }[] = [];

  // Método para agregar un lugar
  addPlace(place: { name: string; lat: number; lng: number }) {
    this.places.push(place); // Agrega el lugar al arreglo de lugares
    console.log('Lugar agregado:', place);
  }

  // Método para obtener la lista de lugares (simula un retraso con promesa)
  getPlaces(): Promise<{ name: string; lat: number; lng: number }[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.places); // Retorna los lugares después de un retraso simulado
      }, 1000); // Simula un retraso de 1 segundo
    });
  }
}
