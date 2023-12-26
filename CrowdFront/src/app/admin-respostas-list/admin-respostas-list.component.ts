import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-admin-respostas-list',
  templateUrl: './admin-respostas-list.component.html',
  styleUrls: ['./admin-respostas-list.component.css']
})
export class AdminRespostasListComponent {

  searchTerm: string = '';
  searchTermId: string = '';

  respostas = {
    id: '',
    id_jellyfishunknown: '',
    resposta_utilizador: '',
    data_resposta: '1900-01-01',
  };

  originalrespostasLista: any[] = [];
  respostasLista: any[] = [];

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService) { }

  ngOnInit() {
    this.carregarRespostas();
  }

  carregarRespostas() {
    this.apiCrowdsourcingService.getRespostasListWithJellyfish().subscribe(
      respostasLista => {
        console.log('Lista de respostas com Jellyfish:', respostasLista);
        this.originalrespostasLista = respostasLista;
        this.filterRespostas(); // Chama a filtragem inicial

      },
      error => {
        console.error('Erro ao carregar respostas com Jellyfish:', error);
      }
    );
  }


  filterRespostas(): void {
    // Se o campo de pesquisa estiver vazio, exibe todos os resultados originais
    if (this.searchTermId.trim() === '') {
      this.respostasLista = [...this.originalrespostasLista];
    } else {
      // Filtra jellyfish com base no termo de pesquisa em qualquer parâmetro
      this.respostasLista = this.originalrespostasLista.filter(respostas =>
        this.containsSearchTermId(respostas)
      );
    }
  }

  containsSearchTermId(respostas: any): boolean {
    const searchTermLowerCase = this.searchTermId.toLowerCase();
    const respostaId = respostas.id_jellyfishunknown.toString().toLowerCase();
    return respostaId === searchTermLowerCase;
  }

  filterRespostas1(): void {
    // Se o campo de pesquisa estiver vazio, exibe todos os resultados originais
    if (this.searchTerm.trim() === '') {
      this.respostasLista = [...this.originalrespostasLista];
    } else {
      // Filtra jellyfish com base no termo de pesquisa em qualquer parâmetro
      this.respostasLista = this.originalrespostasLista.filter(respostas =>
        this.containsSearchTerm(respostas)
      );
    }
  }

  containsSearchTerm(respostas: any): boolean {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    if (respostas.id_jellyfishunknown) {
      const nomeImagem = respostas.jellyfish?.nome_imagem.toString().toLowerCase();
      return nomeImagem.includes(searchTermLowerCase);
    } else {
      return false;
    }
  }
}
