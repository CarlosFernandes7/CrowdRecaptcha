import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-jellyfish',
  templateUrl: './jellyfish.component.html',
  styleUrls: ['./jellyfish.component.css']
})
export class JellyfishComponent implements OnInit, OnDestroy {

  backendData: any;
  unknownJellyfishData: any; // New property for unknown jellyfish data
  private ngUnsubscribe = new Subject<void>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchUnknownJellyfishData(); // Call the new method
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

  // fetchUnknownJellyfishData() {
  //   this.http.get('http://localhost:3000/jellyfishunknown') // Adjust the endpoint accordingly
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(
  //       (data) => {
  //         this.unknownJellyfishData = data;
  //         console.log('Dados do backend (Jellyfish Unknown):', this.unknownJellyfishData);
  //       },
  //       (error) => {
  //         console.error('Erro ao obter dados do backend (Jellyfish Unknown):', error);
  //       }
  //     );
  // }

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
