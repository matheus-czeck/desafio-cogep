import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private apiUrl = 'http://localhost:3000/pessoas';
  constructor(private http: HttpClient) {}


  addPessoa(pessoa: any): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http.post(this.apiUrl, pessoa, { headers });
  }

  getPessoas(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }


  getPessoaById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
}  
