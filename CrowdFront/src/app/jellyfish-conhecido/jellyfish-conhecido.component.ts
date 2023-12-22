import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jellyfish-conhecido',
  templateUrl: './jellyfish-conhecido.component.html',
  styleUrls: ['./jellyfish-conhecido.component.css']
})
export class JellyfishConhecidoComponent implements OnInit {
  conhecidoData: any[] = [];
  jellyfishAtual: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchConhecidoData();
  }

  fetchConhecidoData() {
    this.http.get('http://localhost:3000/jellyfish')
      .subscribe(
        (data) => {
          this.conhecidoData = this.shuffleArray(data as any[]);
          this.mostrarProximaMedusa();
          console.log('Dados das medusas conhecidas:', this.conhecidoData);
        },
        (error) => {
          console.error('Erro ao obter dados das medusas conhecidas:', error);
        }
      );
  }

  mostrarProximaMedusa() {
    if (this.conhecidoData.length > 0) {
      this.jellyfishAtual = this.conhecidoData.pop();
    }
  }

  // getImagemUrlConhecidos(nomeImagem: string): string {
  //   return `/assets/JellyFishConhecidos/${nomeImagem}`;
  // }

  getImagemUrlConhecidos(nomeImagem: string): string {
    // Altere a URL para incluir a rota do servidor
    const imageUrl = `http://localhost:3000/assets/JellyFishConhecidos/${nomeImagem}`;
    return imageUrl;
  }


  private shuffleArray(array: any[]): any[] {
    // Algoritmo de Fisher-Yates para embaralhar um array
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
