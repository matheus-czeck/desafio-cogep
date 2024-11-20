import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private apiUrl = 'http://localhost:3000/atividades';

  constructor(private http: HttpClient) {}

  addAtividade(atividade: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, atividade, { headers });
  }
}
