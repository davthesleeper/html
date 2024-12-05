import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEvaluationsService {
  private apiUrl = 'https://example.com/api/evaluations';

  constructor(private http: HttpClient) {}

  getEvaluations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createEvaluation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEvaluation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEvaluation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
