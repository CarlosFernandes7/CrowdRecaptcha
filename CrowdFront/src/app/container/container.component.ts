import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { JellyfishComponent } from '../jellyfish/jellyfish.component';
import { JellyfishConhecidoComponent } from '../jellyfish-conhecido/jellyfish-conhecido.component';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterViewInit {
  @ViewChild(JellyfishComponent) jellyfishComponent!: JellyfishComponent;
  @ViewChild(JellyfishConhecidoComponent) jellyfishConhecidoComponent!: JellyfishConhecidoComponent;

  constructor(private alertService: AlertService) {} // Injeção de dependência aqui

  conhecidoData: any[] = [];  // Certifique-se de que a propriedade existe
  contadorImagens: number = 0;
  contadorErros: number = 1;
  limiteOportunidades: number = 6;
  alertMessage: string = "";
  errorMessage: string = "";



  
  ngAfterViewInit(): void {
    // Neste ponto, os ViewChilds estão inicializados
  }
  // submeterRespostas() {
  //   if (this.jellyfishComponent && this.jellyfishConhecidoComponent) {
  //     const nomeVerificadoCorretamente = this.jellyfishConhecidoComponent.verificarNome();
  //     this.contadorImagens++;
  //     // Check if the nome was verified correctly before proceeding with the response
  //     if (nomeVerificadoCorretamente) {
  //       // Call the submitSelectedResponse() method on the jellyfishComponent
  //       this.jellyfishComponent.submitSelectedResponse()
  //         .then((resposta) => {
  //           if (resposta) {
  //             console.log('Contador de Imagens:', this.contadorImagens);
  //           } else {
  //             console.error('Falha ao submeter a resposta.');
  //             alert('Ups. Tenta novamente');
  //             this.contadorErros++;
  //             console.log('Erros:', this.contadorErros);

  //           }
  //         })
  //         .catch(error => {
  //           console.error('Erro ao processar a promessa:', error);
  //         });
  //     } else {
  //       console.error('Nome não verificado corretamente. Não é possível submeter a resposta.');
  //       alert('Ups. Tenta novamente');
  //       this.contadorErros++;
  //       console.log('Erros:', this.contadorErros);
  //     }
  //   }
  // }
  
  submeterRespostas() {
    if (this.jellyfishComponent && this.jellyfishConhecidoComponent) {
      const nomeVerificadoCorretamente = this.jellyfishConhecidoComponent.verificarNome();
      this.contadorImagens++;
  
      // Check if the nome was verified correctly before proceeding with the response
      if (nomeVerificadoCorretamente) {
        // Call the submitSelectedResponse() method on the jellyfishComponent
        this.jellyfishComponent.submitSelectedResponse()
          .then((resposta) => {
            if (resposta) {
              console.log('Contador de Imagens:', this.contadorImagens);
            } else {
              console.error('Falha ao submeter a resposta.');
              this.alertMessage = `Ups, houve um problema! Já falhaste: ${this.contadorErros}! Tens mais ${this.limiteOportunidades - this.contadorErros - 1} oportunidades.`;
              ;
              this.errorMessage = ''; // Limpa mensagens de erro se houver
              // alert('Ups. Tenta novamente');
              this.contadorErros++;
              console.log('Erros:', this.contadorErros);
  
              // Verificar se contadorErros é maior ou igual a 10
              if (this.contadorErros == this.limiteOportunidades) {
                console.log('Redirecionando para a pagina de recomeço');
                window.location.href = 'http://localhost:4200/home';
              }
            }
          })
          .catch(error => {
            console.error('Erro ao processar a promessa:', error);
          });
      } else {
        console.error('Nome não verificado corretamente. Não é possível submeter a resposta.');
        // alert('Ups. Tenta novamente');
        this.alertMessage = `Ups, houve um problema! Já falhaste: ${this.contadorErros}! Tens mais ${this.limiteOportunidades - this.contadorErros - 1} oportunidades.`;
        this.errorMessage = ''; // Limpa mensagens de erro se houver
        this.contadorErros++;
        console.log('Erros:', this.contadorErros);
  
        // Verificar se contadorErros é maior ou igual a 10
        if (this.contadorErros == this.limiteOportunidades) {
          console.log('Redirecionando para www.facebook.com');
          window.location.href = 'http://localhost:4200/home';
        }
      }
    }
  }
  
}
