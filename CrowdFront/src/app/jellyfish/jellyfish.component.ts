import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jellyfish',
  templateUrl: './jellyfish.component.html',
  styleUrls: ['./jellyfish.component.css']
})
export class JellyfishComponent implements OnInit, OnDestroy {
  backendData: any; // Dados do backend para as jellyfish conhecidas
  unknownJellyfishData: any; // Nova propriedade para os dados das jellyfish desconhecidas
  private ngUnsubscribe = new Subject<void>(); // Sujeito para desinscrever observáveis quando o componente é destruído
  jellyfishData: any; // Armazenar dados para a jellyfish selecionada

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.fetchData(); // Buscar dados das jellyfish conhecidas
    this.fetchUnknownJellyfishData(); // Buscar dados das jellyfish desconhecidas

    // Certificar-se de chamar após os dados serem carregados
    setTimeout(() => {
      const dataLength = this.getUnknownJellyfishDataLength();
      this.selectedJellyfishId = this.generateRandomJellyfishId(1, dataLength);

      this.fetchJellyfishById(); // Buscar dados da jellyfish selecionada
    }, 1000); // Ajustar o valor conforme necessário
  }

  generateRandomJellyfishId(min: number, max: number): string {
    // Verificar se o array de dados é válido e não está vazio
    if (this.unknownJellyfishData && this.unknownJellyfishData.length > 0) {
      // Verificar se min é menor que max
      if (min < max) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
          // Verificar se o índice gerado é válido
        } while (randomIndex < 0 || randomIndex >= this.unknownJellyfishData.length);

        const result = this.unknownJellyfishData[randomIndex].id.toString();
        console.log('Número aleatório:', result);
        return result;
      } else {
        console.error('O valor de min deve ser menor que max.');
        return '';
      }
    } else {
      console.error('Dados não disponíveis para gerar um ID aleatório.');
      return '';
    }
  }

  getUnknownJellyfishDataLength(): number {
    if (this.unknownJellyfishData && Array.isArray(this.unknownJellyfishData)) {
      console.log('Dados foram exportados');
      return this.unknownJellyfishData.length;
    } else {
      console.error('Dados de jellyfish unknown não válidos ou não disponíveis.');
      return 0; // Ou retornar um valor padrão conforme necessário
    }
  }

  fetchData() {
    this.http.get('http://localhost:3000/jellyfish')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.backendData = data;
          console.log('Dados do backend:', this.backendData);
        },
        (error) => {
          console.error('Erro ao obter dados do backend:', error);
        }
      );
  }

  fetchUnknownJellyfishData() {
    this.http.get('http://localhost:3000/jellyfishunknown') // Ajustar o endpoint conforme necessário
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.unknownJellyfishData = data;

          // Inicializar a propriedade 'response' para cada jellyfishunknown
          this.unknownJellyfishData.forEach((jellyfishunknown: any) => {
            jellyfishunknown.response = '';
          });

          console.log('Dados do backend (Jellyfish Unknown):', this.unknownJellyfishData);
        },
        (error) => {
          console.error('Erro ao obter dados do backend (Jellyfish Unknown):', error);
        }
      );
  }

  selectedJellyfishId: string = "";
  selectedJellyfishData: any;

  fetchJellyfishById() {
    if (this.selectedJellyfishId) {
      this.fetchUnknownJellyfishById(this.selectedJellyfishId);
    } else {
      console.error('Por favor, insira um ID de Jellyfish.');
      // Lidar com o caso em que nenhum ID é inserido
    }
  }

  fetchUnknownJellyfishById(id: string) {
    const url = `http://localhost:3000/jellyfishunknown/${id}`;

    this.http.get(url)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.selectedJellyfishData = data;
          this.selectedJellyfishData.response = ''; // Inicializar a propriedade 'response'

          console.log('Dados para a Jellyfish Unknown selecionada:', this.selectedJellyfishData);
        },
        (error) => {
          console.error('Erro ao buscar dados para a Jellyfish Unknown selecionada:', error);
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getImagemUrl(nomeImagem: string): string {
    return `/assets/JellyFishConhecidos/${nomeImagem}`;
  }

  getImagemUrlDesconhecidos(nomeImagem: string): string {
    return `/assets/JellyFishDesconhecidos/${nomeImagem}`;
  }

  submitResponse(jellyfishunknown: any) {
    console.log('Dados a serem enviados para inserirResposta:', jellyfishunknown.id, jellyfishunknown.response);

    // Certificar-se de que 'response' está presente em jellyfishunknown
    if (jellyfishunknown && 'response' in jellyfishunknown && jellyfishunknown.response) {
      // Enviar a resposta para o backend
      const resposta = {
        id_jellyfishunknown: jellyfishunknown.id,
        resposta_utilizador: jellyfishunknown.response
      };

      this.http.post('http://localhost:3000/respostas', resposta)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (data) => {
            console.log('Resposta enviada com sucesso:', data);
            // Realizar qualquer outra ação necessária após o envio bem-sucedido
          },
          (error) => {
            console.error('Erro ao enviar resposta:', error);
            // Lidar com erros aqui
          }
        );
    } else {
      console.error('Resposta inválida.');
      // Lidar com casos em que a resposta é inválida
    }
  }
}
