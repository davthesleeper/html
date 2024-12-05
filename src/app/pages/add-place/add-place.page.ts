import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../services/evaluation.service'; // Servicio para guardar evaluaciones

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {
  placeName: string = '';
  latitude: number = 0;
  longitude: number = 0;
  comment: string = '';
  photo: string | null = null; // Para almacenar la URL de la foto cargada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService // Servicio para manejar evaluaciones
  ) {}

  ngOnInit() {
    // Obtén los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.latitude = params['lat'] || 0;
      this.longitude = params['lng'] || 0;
    });
  }

  // Lógica para subir una foto
  uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photo = e.target.result; // Guarda la foto como base64
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  // Lógica para guardar el lugar
  async savePlace() {
    if (!this.placeName || !this.comment) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    const placeData = {
      name: this.placeName,
      latitude: this.latitude,
      longitude: this.longitude,
      comment: this.comment,
      photo: this.photo,
    };

    try {
      await this.evaluationService.addEvaluation(placeData);
      alert('Lugar guardado exitosamente.');
      this.router.navigate(['/evaluations']); // Redirige a la página de evaluaciones
    } catch (error) {
      console.error('Error al guardar el lugar:', error);
      alert('Ocurrió un error al guardar el lugar.');
    }
  }
}
