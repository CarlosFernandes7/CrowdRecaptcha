import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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



getRespostasListWithJellyfish(): Observable<any[]> {
  const respostasUrl = `${this.apiUrl}/respostas`;
  const jellyfishUnknownUrl = `${this.apiUrl}/jellyfishUnknown`;

  // Faz um forkJoin para combinar as chamadas em paralelo
  return forkJoin([
    this.http.get<any[]>(respostasUrl),
    this.http.get<any[]>(jellyfishUnknownUrl)
  ]).pipe(
    map(([respostas, jellyfishUnknown]) => {
      // Mapeia os resultados para combinar as informações
      return respostas.map(resposta => {
        const jellyfishInfo = jellyfishUnknown.find(jellyfish => jellyfish.id === resposta.id_jellyfishunknown);
        return {
          ...resposta,
          jellyfish: jellyfishInfo
        };
      });
    })
  );
}

removeJellyfish(jellyfishId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/jellyfish/${jellyfishId}`);
}

}