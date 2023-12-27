import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';


@Component({
  selector: 'app-admin-jelly-list',
  templateUrl: './admin-jelly-list.component.html',
  styleUrls: ['./admin-jelly-list.component.css']
})
export class AdminJellyListComponent {
  searchTerm: string = '';
  searchTermId: string = '';

  jellyfish = {
    id: '',
    id_jellyfishunknwon: '',
    nome: '',
    nome_imagem: '',
  };



  originalJellyfishList: any[] = [];
  jellyfishList: any[] = [];

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService) { }

  ngOnInit() {
    this.carregarJellyfish();
  }

  carregarJellyfish() {
    this.apiCrowdsourcingService.getJellyfishList()
      .subscribe(
        jellyfishList => {
          console.log('Lista de Jellyfish:', jellyfishList);
          this.originalJellyfishList = jellyfishList;
          this.filterJellyfish2(); // Chama a filtragem inicial
        },
        error => {
          console.error('Erro ao obter a lista de Jellyfish:', error);
        }
      );
  }

  filterJellyfish2(): void {
    // Se o campo de pesquisa estiver vazio, exibe todos os resultados originais
    if (this.searchTerm.trim() === '') {
      this.jellyfishList = [...this.originalJellyfishList];
    } else {
      // Filtra jellyfish com base no termo de pesquisa em qualquer parâmetro
      this.jellyfishList = this.originalJellyfishList.filter(jellyfish =>
        this.containsSearchTerm(jellyfish)
      );
    }
  }

  containsSearchTerm(jellyfish: any): boolean {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    return (
      jellyfish.nome.toLowerCase().includes(searchTermLowerCase) ||
      jellyfish.descricao.toLowerCase().includes(searchTermLowerCase) ||
      jellyfish.nome_imagem.toLowerCase().includes(searchTermLowerCase) ||
      jellyfish.id.toString().includes(searchTermLowerCase)
    );
  }



  filterJellyfishId(): void {
    // Se o campo de pesquisa estiver vazio, exibe todos os resultados originais
    if (this.searchTermId.trim() === '') {
      this.jellyfishList = [...this.originalJellyfishList];
    } else {
      // Filtra jellyfish com base no termo de pesquisa em qualquer parâmetro
      this.jellyfishList = this.originalJellyfishList.filter(jellyfish =>
        this.containsSearchTermId(jellyfish)
      );
    }
  }

  containsSearchTermId(jellyfish: any): boolean {
    const searchTermLowerCase = this.searchTermId.toLowerCase();
    const jellyfishId = jellyfish.id.toString().toLowerCase();
    return jellyfishId === searchTermLowerCase;
  }

  removeJellyfish(jellyfishId: number): void {
    this.apiCrowdsourcingService.removeJellyfish(jellyfishId)
      .subscribe(
        () => {
          console.log(`Jellyfish with ID ${jellyfishId} removed successfully.`);
          this.carregarJellyfish(); // Reload the jellyfish list after removal
        },
        error => {
          console.error(`Error removing jellyfish with ID ${jellyfishId}:`, error);
        }
      );
  }

  handleImageError(jellyfish: any): void {
    console.error(`Failed to load image for Jellyfish with ID ${jellyfish.id}`);
  }
}