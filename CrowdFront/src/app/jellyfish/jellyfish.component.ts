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

  
  backendData: any;
  unknownJellyfishData: any; // New property for unknown jellyfish data
  private ngUnsubscribe = new Subject<void>();
  jellyfishData: any; // Store data for the selected jellyfish


  constructor(private route: ActivatedRoute, private http: HttpClient) {
 
  }
  

  
  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.fetchData();
    this.fetchUnknownJellyfishData();
  
    // Certifique-se de chamar após os dados serem carregados
    setTimeout(() => {
      const dataLength = this.getUnknownJellyfishDataLength();
      this.selectedJellyfishId = this.generateRandomJellyfishId(1, dataLength);
      this.fetchJellyfishById();
    }, 50); // Ajuste o valor conforme necessário
  }
  
  getUnknownJellyfishDataLength(): number {
    if (this.unknownJellyfishData && Array.isArray(this.unknownJellyfishData)) {
      console.log('Dados foram exportados');
      return this.unknownJellyfishData.length;
    } else {
      console.error('Dados de jellyfish unknown não válidos ou não disponíveis.');
      return 0; // Ou retorne um valor padrão conforme necessário
    }
  }

  generateRandomJellyfishId(min: number, max: number): string {
    if (this.unknownJellyfishData && this.unknownJellyfishData.length > 0) {
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      const result = this.unknownJellyfishData[randomIndex].id.toString();
      console.log('Número aleatório:', result);
      return result;
    } else {
      console.error('Dados não disponíveis para gerar um ID aleatório.');
      return '';
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
    this.http.get('http://localhost:3000/jellyfishunknown') // Adjust the endpoint accordingly
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.unknownJellyfishData = data;

          // Inicialize a propriedade 'response' para cada jellyfishunknown
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
      console.error('Please enter a Jellyfish ID.');
      // Handle the case where no ID is entered
    }
  }

  fetchUnknownJellyfishById(id: string) {
    const url = `http://localhost:3000/jellyfishunknown/${id}`;

    this.http.get(url)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.selectedJellyfishData = data;
          this.selectedJellyfishData.response = ''; // Initialize the 'response' property

          console.log('Data for the selected Jellyfish Unknown:', this.selectedJellyfishData);
        },
        (error) => {
          console.error('Error fetching data for the selected Jellyfish Unknown:', error);
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
  
    // Certifique-se de que 'response' está presente em jellyfishunknown
    if (jellyfishunknown && 'response' in jellyfishunknown && jellyfishunknown.response) {
      // Envie a resposta para o backend
      const resposta = {
        id_jellyfishunknown: jellyfishunknown.id,
        resposta_utilizador: jellyfishunknown.response
      };
  
      this.http.post('http://localhost:3000/respostas', resposta)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (data) => {
            console.log('Resposta enviada com sucesso:', data);
            // Faça qualquer outra ação necessária após o envio bem-sucedido
          },
          (error) => {
            console.error('Erro ao enviar resposta:', error);
            // Lide com erros aqui
          }
        );
    } else {
      console.error('Resposta inválida.');
      // Lide com casos onde a resposta é inválida
    }
  }
}