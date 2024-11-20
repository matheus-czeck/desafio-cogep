import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private apiUrl = 'http://localhost:3000/pessoas'; // URL do backend

  constructor(private http: HttpClient) {}

  // Adiciona o método para cadastrar uma pessoa
  addPessoa(pessoa: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera o token JWT

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
    });

    return this.http.post(this.apiUrl, pessoa, { headers });
  }

  // Método para buscar pessoas já cadastradas
  getPessoas(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }

 
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
  }


  getPessoaById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
}  
