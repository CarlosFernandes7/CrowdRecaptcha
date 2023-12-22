import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-jellyfish',
  templateUrl: './jellyfish.component.html',
  styleUrls: ['./jellyfish.component.css']
})
export class JellyfishComponent implements OnInit, OnDestroy {
  desconhecidoData: any[] = [];
  selectedJellyfishData: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDesconhecidoData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  fetchDesconhecidoData(): void {
    this.http.get<any[]>('http://localhost:3000/jellyfishunknown')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.desconhecidoData = data;
          this.mostrarProximaJellyfishDesconhecido();
          console.log('Dados das medusas desconhecidas:', this.desconhecidoData);
        },
        (error) => {
          console.error('Erro ao obter dados das medusas desconhecidas:', error);
        }
      );
  }
  mostrarProximaJellyfishDesconhecido(): void {
    if (this.desconhecidoData.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.desconhecidoData.length);
      this.selectedJellyfishData = this.desconhecidoData[randomIndex];
    }
  }

  getImagemUrlDesconhecidos(nomeImagem: string): string {
    // Altere a URL para incluir a rota do servidor
    return `http://localhost:3000/assets/JellyFishDesconhecidos/${nomeImagem}`;
  }

  submitResponse(): void {
    if (this.selectedJellyfishData && 'response' in this.selectedJellyfishData && this.selectedJellyfishData.response) {
      const resposta = {
        id_jellyfishunknown: this.selectedJellyfishData.id,
        resposta_utilizador: this.selectedJellyfishData.response
      };

      this.http.post('http://localhost:3000/respostas', resposta)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (data) => {
            console.log('Resposta enviada com sucesso:', data);
            window.location.reload();
          },
          (error) => {
            console.error('Erro ao enviar resposta:', error);
          }
        );
    } else {
      console.error('Resposta inválida.');
    }
  }

  getImagemUrl(nomeImagem: string): string {
    // Altere a URL para incluir a rota do servidor
    return `http://localhost:3000/assets/JellyFishDesconhecidos/${nomeImagem}`;
  }
}
