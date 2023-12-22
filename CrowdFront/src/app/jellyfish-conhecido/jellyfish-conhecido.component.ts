import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-jellyfish-conhecido',
  templateUrl: './jellyfish-conhecido.component.html',
  styleUrls: ['./jellyfish-conhecido.component.css']
})
export class JellyfishConhecidoComponent implements OnInit {
  conhecidoData: any[] = [];
  jellyfishAtual: any;
  enteredName: string = '';
  respostaCorreta: boolean = false;
  selectedJellyfish: string = '';
  allJellyfishNames: string[] = [];

  constructor(private apiService: ApiCrowdsourcingService) {}

  ngOnInit(): void {
    this.fetchConhecidoData();
  }

  fetchConhecidoData() {
    this.apiService.getAllJellyfish().subscribe(
        (data) => {
          this.conhecidoData = (data as any[]);
          this.allJellyfishNames = [...this.conhecidoData.map(jellyfish => jellyfish.nome)].filter(Boolean).sort();
          this.mostrarImagemAleatoria();
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
      this.respostaCorreta = false;
      this.selectedJellyfish = '';
      this.atualizarInputNome();
    }
  }

  mostrarImagemAleatoria() {
    if (this.conhecidoData.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.conhecidoData.length);
      this.jellyfishAtual = this.conhecidoData[randomIndex];
      this.respostaCorreta = false;
      this.selectedJellyfish = '';
      this.atualizarInputNome();
    }
  }

  getImagemUrlConhecidos(nomeImagem: string): string {
    const imageUrl = `http://localhost:3000/assets/JellyFishConhecidos/${nomeImagem}`;
    return imageUrl;
  }

  verificarNome() {
    this.respostaCorreta = (this.enteredName.trim().toLowerCase() === this.jellyfishAtual.nome.trim().toLowerCase());

    if (this.respostaCorreta) {
      alert('Nome correto!');
    } else {
      alert('Nome incorreto! Tente novamente.');
    }
  }

  atualizarInputNome() {
    this.enteredName = this.selectedJellyfish;
  }
}
