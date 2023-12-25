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

  addJellyfish(jellyfishData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jellyfish`, jellyfishData);
}


 getJellyfishList(): Observable<any> {
    const url = 'http://localhost:3000/jellyfish';
    return this.http.get(url);
}

}
