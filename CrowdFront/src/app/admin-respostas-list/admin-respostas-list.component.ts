import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';
import * as XLSX from 'xlsx';


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

  exportAllAnswersExcel(): void {
    const data = this.respostasLista.map(resposta => ({
      'Id Resposta': resposta.id,
      'ID da Imagem': resposta.id_jellyfishunknown,
      'Resposta': resposta.resposta_utilizador,
      'Data de resposta': resposta.data_resposta,
      'Nome da Imagem': resposta.jellyfish?.nome_imagem,
    }));
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Respostas');
  
    XLSX.writeFile(wb, 'respostas.xlsx');
  }
  
  
  exportAllAnswersJSON(): void {
    const jsonData = JSON.stringify(this.respostasLista, null, 2);
  
    // Crie um blob com os dados e inicie o download
    const blob = new Blob([jsonData], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
  
    // Crie um link temporário e clique nele para iniciar o download
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'respostas.json';
  
    // Adicione o link temporário ao DOM e clique nele
    document.body.appendChild(a);
    a.click();
  
    // Remova o link temporário do DOM
    document.body.removeChild(a);
  
    // Libere o objeto URL
    URL.revokeObjectURL(blobUrl);
  }
}