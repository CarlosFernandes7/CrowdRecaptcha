import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCrowdsourcingService {

  private apiUrl = 'http://localhost:3000'; // Coloque a URL da sua API aqui


  constructor(private http: HttpClient) {}

  getAllJellyfish(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jellyfish`);
  }
  // Adicione métodos para outras operações conforme necessário


}
